import express from 'express'
import ProductModel from '../models/ProductModel'

const router = express.Router()

const productsRoute = router.post('/', (req, res) => {
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

export default productsRoute
