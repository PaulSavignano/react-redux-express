import express from 'express'

import User from '../../users/models/User'
import Order from '../models/Order'
import authenticate from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const orders = express.Router()

const formatPrice = (cents) => `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`


// Create
orders.post('/', authenticate(['user']), (req, res, next) => {
  const { token, fullAddress, name, phone, street, city, state, zip, cart } = req.body
  const { firstName, lastName, email } = req.user.values
  User.findOne({ _id: req.user._id })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
    .then(user => {
      console.log('user: ', user)
      let address
      if (fullAddress === 'newAddress') {
        address = { values: { name, phone, street, city, zip, state }}
        console.log('address variable: ', address)
        user.addresses.push(address)
      } else {
        address = user.addresses.find(item => item._id.toHexString() === fullAddress).values
        console.log('index found address: ', address)
      }
      console.log('address: ', address)
      const stripe = require("stripe")(process.env.STRIPE_SK_TEST)
      stripe.charges.create({
        amount: cart.total,
        currency: "usd",
        source: token,
        description: `${process.env.APP_NAME} Order`
      })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
        .then(charge => {
          console.log('charged stripe')
          const newOrder = new Order({
            userId: user._id,
            paymentId: charge.id,
            total: cart.total,
            firstName,
            lastName,
            email,
            address,
            cart
          })
          newOrder.save()
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
            .then(order => {
              res.send(order)
              const { email, firstName, lastName } = user.values
              sendEmail1({
                to: email,
                toSubject: 'Thank you for your order!',
                name: ``,
                toBody: `
                  <p>Hi ${firstName},</p>
                  <p>Thank you for your recent order ${order._id}.  We are preparing your order for delivery and will send you a confirmation once it has shipped.  Please don't hesitate to reach out regarding anything we can with in the interim.</p>
                `,
                fromSubject: `New order received!`,
                fromBody: `
                  <p>${firstName} ${lastName} just placed order an order!</p>
                  <div>Order: ${order._id}</div>
                  <div>Total: ${formatPrice(order.cart.total)}</div>
                  <div>Quantity: ${order.cart.quantity}</div>
                  <div>Items:</div>
                  <ul>
                    ${order.cart.items.map(item => `<li>${item.productQty} of ${item.name}</li>`)}
                  </ul>
                  <div>Once shipped, you can mark the item as shipped in at ${process.env.ROOT_URL}/admin/orders to send confirmation to ${firstName}.</div>
                `
              })
              user.save()
            })
        })
    })
})


// Read
orders.get('/', authenticate(['user']), (req, res) => {
  Order.find({ userId: req.user._id })
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send(err))
})

export default orders
