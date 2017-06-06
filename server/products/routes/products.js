import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import slugIt from '../../middleware/slugIt'
import Product from '../models/Product'


const products = express.Router()

const s3Path = `${process.env.APP_NAME}/products`

// Create
products.post('/', (req, res) => {
  const { sectionId } = req.body
  const product = new Product({
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  product.save()
    .then(doc => {
        res.send(doc)
      })
    .catch(err => {
      res.status(400).send(err)
    })
})



// Read
products.get('/', (req, res) => {
  Product.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(400).send(err))
})

// By product name
products.get('/:_id', (req, res) => {
  const _id = req.params._id
  Product.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
products.patch('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, values } = req.body
  switch (type) {

    case 'UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location }
          Product.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null }
          Product.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'UPDATE_VALUES':
      Product.findOneAndUpdate({ _id }, { $set: { values: values, slug: slugIt(values.name) }}, { new: true })
        .then(doc => {
          res.send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      break

    default:
      return
  }
})



// Delete
products.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Product.findOne({ _id })
    .then(doc => {
      if (doc.image) {
        deleteFile({ Key: `${s3Path}/${_id}` })
          .then(() => {
            Product.findOneAndRemove({ _id })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          })
      } else {
        Product.findOneAndRemove({ _id,})
          .then(doc => res.send(doc))
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }
    })
})



export default products
