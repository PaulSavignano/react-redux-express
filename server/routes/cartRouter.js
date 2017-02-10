import express from 'express'
import CartModel from '../models/CartModel'

const cartRouter = express.Router()

cartRouter.post('/', (req, res) => {
  const cartItem = new CartModel({
    productId: req.body.productId,
    quantity: req.body.quantity
  })
  cartItem.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

cartRouter.get('/', (req, res) => {
  CartModel.find({})
    .then(cartProducts => res.send({ cartProducts }))
    .catch(err => res.status(400).send(err))
})

export default cartRouter
