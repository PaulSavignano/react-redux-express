import express from 'express'
import CartModel from './CartModel'

const cartsRouter = express.Router()

cartsRouter.post('/', (req, res) => {
  const cart = new CartModel({
    productId: req.body.productId,
    productQty: req.body.productQty
  })
  cart.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

cartsRouter.get('/', (req, res) => {
  CartModel.find({})
    .then(carts => res.send({ carts }))
    .catch(err => res.status(400).send(err))
})

export default cartsRouter
