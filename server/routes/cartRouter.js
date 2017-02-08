import express from 'express'
import CartModel from '../models/CartModel'

const cartRouter = express.Router()

cartRouter.post('/', (req, res) => {
  const cartItem = new CartModel({
    text: req.body.text
  })
  cartItem.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

export default cartRouter
