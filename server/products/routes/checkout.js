import express from 'express'
import { authenticate } from '../../middleware/authenticate'
import Order from '../models/Order'

const checkout = express.Router()

// Create
checkout.post('/', authenticate(['user']), (req, res, next) => {
  const stripe = require("stripe")(
    process.env.STRIPE_SK_TEST
  )
  stripe.charges.create({
    amount: req.body.cart.total,
    currency: "usd",
    source: req.body.token,
    description: "Test charge!!!"
  })
    .then(charge => {
      console.log(req.body)
      console.log('charged!')
      console.log(req.body.address)
      const order = new Order({
        user: req.user._id,
        cart: req.body.cart,
        address: req.body.address,
        zip: req.body.zip,
        state: req.body.state,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        paymentId: charge.id
      })
      order.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.send(err))
})

export default checkout
