import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'

const products = express.Router()

// Create
products.post('/', authenticate(['admin']), (req, res) => {
  const { image, values } = req.body
  const _id = new ObjectID()
  const hasImage = image ? url.parse(image) : null
  if (hasImage.slashes) {
    const product = new Product({
      _id,
      slug: values.name.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase(),
      values
    })
    product.save()
      .then(doc => {
        console.log(doc)
        res.send(doc)
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })
  } else {
    uploadFile({ Key: `pages/products/${_id}`, Body: image })
      .then(data => {
        const product = new Product({
          _id,
          image: data.Location,
          slug: values.name.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase(),
          values
        })
        product.save()
          .then(doc => {
            console.log(doc)
            res.send(doc)
          })
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      })
  }
})



// Read
products.get('/', (req, res) => {
  Product.find({})
    .then(products => res.send(products))
    .catch(err => res.status(400).send(err))
})

products.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Product.findOne({ _id })
    .then(product => {
      if (!todo) return res.status(404).send()
      res.send(product)
    })
    .catch((err) => res.status(400).send(err))
})



// Update
products.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { image, values } = req.body
  const hasImage = image ? url.parse(image) : null
  if (hasImage.slashes) {
    return Product.findOneAndUpdate({ _id }, { $set: { image, values }}, { new: true })
      .then(doc => res.send(doc))
      .catch(err => res.status(400).send(err))
  }
  uploadFile({ Key: `pages/products/${_id}`, Body: req.body.image })
    .then(data => {
      Product.findOneAndUpdate({ _id }, { $set: { image: data.Location, values }}, { new: true })
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
})




// Delete
products.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  deleteFile({ Key: `pages/products/${_id}` })
    .then(() => {
      Product.findOneAndRemove({ _id })
        .then(product => res.send(product))
        .catch((err) => res.status(400).send(err))
    })
})



export default products
