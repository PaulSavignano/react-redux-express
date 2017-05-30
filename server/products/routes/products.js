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
  const { type, image, values } = req.body
  const _id = new ObjectID()
  const product = new Product({
    _id,
    slug: slugIt(values.name),
    image,
    values
  })
  switch (type) {
    case 'ADD_ITEM_ADD_IMAGE':
    uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
      .then(data => {
        product.image = data.Location
        product.save()
          .then(doc => {
              res.send(doc)
            })
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      })
      break
    case 'ADD_ITEM':
      product.save()
        .then(doc => res.send(doc))
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    default:
      return
  }
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

    case 'UPDATE_ITEM_UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location, values, slug: slugIt(values.name) }
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

    case 'UPDATE_ITEM_DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null, values, slug: slugIt(values.name) }
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

    case 'UPDATE_ITEM':
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
