import express from 'express'

import User from '../../users/models/User'
import Order from '../models/Order'
import authenticate from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const orders = express.Router()

// Create
orders.post('/', authenticate(['user']), (req, res, next) => {
  const { token, cart, firstname, lastname, address, zip, state } = req.body
  User.findOneAndUpdate({ _id: req.user._id }, { $set: { 'values.address': address, 'values.zip': zip, 'values.state': state } }, { new: true })
    .then(() => {
      const stripe = require("stripe")(process.env.STRIPE_SK_TEST)
      stripe.charges.create({
        amount: cart.total,
        currency: "usd",
        source: token,
        description: "Test charge!!!"
      })
        .then(charge => {
          const order = new Order({
            user: req.user._id,
            cart,
            address,
            zip,
            state,
            firstname,
            lastname,
            paymentId: charge.id
          })
          order.save()
            .then(doc => {
              console.log('striping')
              res.send(doc)
              return doc
            })
            .then(doc => sendEmail1({
              to: 'paul.savignano@gmail.com',
              subject: 'Thank you for your order!',
              name: `${firstname}`,
              body: `<p>Thank you for your recent order ${doc._id}.</p>`
            }))
            .catch(err => {
              console.log('error: ', err)
              res.status(400).send(err)
            })
      })
    })

})


// Read
orders.get('/', authenticate(['user']), (req, res) => {
  Order.find({ user: req.user._id })
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send(err))
})

export default orders
