import express from 'express'
import { ObjectID } from 'mongodb'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'

const products = express.Router()

products.post('/', authenticate(['admin']), (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  })
  product.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})

products.get('/', (req, res) => {
  Product.find({})
    .then(products => res.send(products))
    .catch(err => res.status(400).send(err))
})

products.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Product.findOne({})
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send())
})


products.get('/images/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Product.findOne({ _id })
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ src: product.image })
    })
    .catch((err) => res.status(400).send())
})

products.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Product.findOneAndRemove({
    _id,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

products.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Product.findOneAndUpdate({ _id }, {$set: body}, {new: true} )
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

export default products
