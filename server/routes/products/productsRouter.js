import express from 'express'
import { ObjectID } from 'mongodb'
import ProductModel from './ProductModel'

const productsRouter = express.Router()

productsRouter.post('/', (req, res) => {
  const product = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })
  product.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

productsRouter.get('/', (req, res) => {
  ProductModel.find({})
    .then(products => res.send(products))
    .catch(err => res.status(400).send(err))
})

productsRouter.get('/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  ProductModel.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

productsRouter.delete('/:_id', (req, res) => {
  const _id = req.params._id
  ProductModel.findOneAndRemove({ _id })
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})


productsRouter.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  ProductModel.findByIdAndUpdate(_id, {$set: body}, {new: true} )
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

export default productsRouter
