import express from 'express'
import { ObjectID } from 'mongodb'
import ProductModel from './ProductModel'

const productsRouter = express.Router()

productsRouter.post('/', (req, res) => {
  const product = new ProductModel({
    uuid: req.body.uuid,
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
    .catch((err) => res.status(400).send())
})

productsRouter.delete('/:uuid', (req, res) => {
  const uuid = req.params.uuid
  ProductModel.findOneAndRemove({ uuid })
    .then((product) => {
      if (!product) {
        return res.status(404).send()
      }
      res.send({ product })
    })
    .catch((err) => res.status(400).send(err))
})

export default productsRouter
