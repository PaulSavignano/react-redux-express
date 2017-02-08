import express from 'express'
import ProductModel from '../models/ProductModel'

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
    .then(products => res.send({ products }))
    .catch(err => res.status(400).send(err))
})

export default productsRouter
