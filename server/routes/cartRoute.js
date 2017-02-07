import express from 'express'
import CartModel from '../models/CartModel'

const router = express.Router()

const cartRoute = router.post('/', (req, res) => {
  const cartItem = new CartModel({
    text: req.body.text
  })
  cartItem.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

export default cartRoute
