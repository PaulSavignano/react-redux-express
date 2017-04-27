import express from 'express'
import { ObjectID } from 'mongodb'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'
import { uploadFile } from '../../middleware/s3'

const products = express.Router()

// Create
products.post('/', authenticate(['admin']), (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    slug: req.body.name.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase()
  })
  product.save()
    .then(doc => {
      uploadFile({ Key: `pages/products/${doc._id}`, Body: req.body.image })
        .then(data => {
          Product.findOne({ _id: doc._id })
            .then(product => {
              product.image = data.Location
              product.save()
                .then(doc => res.send(doc))
            })
        })
    })
    .catch(err => res.status(400).send(err))
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
  Product.findOne({})
    .then(product => res.send({ product }))
    .catch((err) => res.status(400).send())
})



// Update
products.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  console.log(_id)
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  uploadFile({ Key: `pages/products/${_id}`, Body: req.body.image })
    .then(data => {
      Product.findOne({ _id })
        .then(product => {
          product.name = req.body.name
          product.image = data.Location
          product.description = req.body.description
          product.price = req.body.price,
          product.slug = req.body.name.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase()
          product.save()
            .then(doc => res.send(doc))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})




// Delete
products.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Product.findOneAndRemove({ _id })
    .then(product => res.send({ product }))
    .catch((err) => res.status(400).send(err))
})



export default products
