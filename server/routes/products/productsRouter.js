import express from 'express'
import { ObjectID } from 'mongodb'
import ProductModel from './ProductModel'
import { authenticate } from '../../middleware/authenticate'

const productRouter = express.Router()

productRouter.post('/', authenticate(['admin']), (req, res) => {
  const product = new ProductModel({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  })
  product.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})

productRouter.get('/', (req, res) => {
  ProductModel.find({})
    .then(products => res.send(products))
    .catch(err => res.status(400).send(err))
})

productRouter.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  ProductModel.findOne({})
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send())
})

productRouter.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  ProductModel.findOneAndRemove({
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

productRouter.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  ProductModel.findOneAndUpdate({ _id }, {$set: body}, {new: true} )
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

export default productRouter
