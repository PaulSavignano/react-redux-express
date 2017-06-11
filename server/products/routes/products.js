import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import slugIt from '../../middleware/slugIt'
import Product from '../models/Product'
import Section from '../../sections/models/Section'

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
    .then(product => {
      Section.findOneAndUpdate({ _id: sectionId }, { $push: { components: { productId: product._id }}, $set: { componentType: 'Product' }}, { new: true })
        .then(section => {
          res.send({ product, section })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
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
  const Key = `${s3Path}/${_id}`
  switch (type) {

    case 'UPDATE_IMAGE':
      uploadFile({ Key }, image)
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
      deleteFile({ Key })
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
      Product.findOneAndUpdate({ _id }, { $set: { values, slug: slugIt(values.name) }}, { new: true })
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

products.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Product.findOneAndRemove({ _id })
    .then(product => {
      Section.findOneAndUpdate({ _id: product.sectionId }, { $pull: { components: { productId: product._id }}}, { new: true })
        .then(section => {
          res.send({ product, section })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
})



export default products
