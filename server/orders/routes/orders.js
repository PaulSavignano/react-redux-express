import express from 'express'

import User from '../../users/models/User'
import Order from '../models/Order'
import authenticate from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const orders = express.Router()

const formatPrice = (cents) => `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`


// Create
orders.post('/', authenticate(['user']), (req, res, next) => {
  const { token, cart, name, street, city, state, zip, phone } = req.body
  const { firstName, lastName, email } = req.user.values
  User.findOneAndUpdate({ _id: req.user._id }, { $push: { addresses: { values: { name, phone, street, city, state, zip } } }}, { new: true })
    .then(user => {
      const stripe = require("stripe")(process.env.STRIPE_SK_TEST)
      stripe.charges.create({
        amount: cart.total,
        currency: "usd",
        source: token,
        description: "Test charge!!!"
      })
        .then(charge => {
          const order = new Order({
            userId: req.user._id,
            paymentId: charge.id,
            email,
            phone,
            firstName,
            lastName,
            address: { name, phone, street, city, state, zip },
            cart
          })
          order.save()
            .then(doc => {
              res.send(doc)
              const { email, firstName, lastName } = req.user.values
              sendEmail1({
                to: email,
                toSubject: 'Thank you for your order!',
                name: ``,
                toBody: `
                  <p>Hi ${firstName},</p>
                  <p>Thank you for your recent order ${doc._id}.  We are preparing your order for delivery and will send you a confirmation once it has shipped.  Please don't hesitate to reach out regarding anything we can with in the interim.</p>
                `,
                fromSubject: `New order received!`,
                fromBody: `
                  <p>${firstName} ${lastName} just placed order an order!</p>
                  <div>Order: ${doc._id}</div>
                  <div>Total: ${formatPrice(doc.cart.total)}</div>
                  <div>Quantity: ${doc.cart.quantity}</div>
                  <div>Items:</div>
                  <ul>
                    ${doc.cart.items.map(item => `<li>${item.productQty} of ${item.name}</li>`)}
                  </ul>
                  <div>Once shipped, you can mark the item as shipped in at ${process.env.ROOT_URL}/admin/orders to send confirmation to ${firstName}.</div>
                `
              })
            })
            .catch(err => {
              console.log('error: ', err)
              res.status(400).send(err)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })

  })
  .catch(err => {
    console.log(err)
    res.status(400).send(err)
  })

})


// Read
orders.get('/', authenticate(['user']), (req, res) => {
  Order.find({ user: req.user._id })
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send(err))
})

export default orders
