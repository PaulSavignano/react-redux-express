import { ObjectID } from 'mongodb'

import Address from '../models/Address'
import User from '../models/User'
import Order from '../models/Order'
import { sendEmail1 } from '../middleware/nodemailer'

const formatPrice = (cents) => `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const add = (req, res, next) => {
  const {
    _id,
    values: {
      firstName,
      lastName,
      email
    }
  } = req.user
  const {
    token,
    fullAddress,
    name,
    phone,
    street,
    city,
    state,
    zip,
    cart
  } = req.body
  if (fullAddress === 'newAddress') {
    const newDoc = new Address({
      user: ObjectID(_id),
      values: {
        name,
        phone,
        street,
        city,
        zip,
        state
      }
    })
    newDoc.save()
    .then(doc => {
      User.findOneAndUpdate(
        { _id },
        { $push: { addresses: doc._id }},
        { new: true }
      )
      .then(() => createCharge({
        _id,
        address: doc,
        cart,
        email,
        firstName,
        lastName,
        token,
        res
      }))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  } else {
    Address.findOne({ _id: fullAddress })
    .then(doc => createCharge({
      _id,
      address: doc,
      cart,
      email,
      firstName,
      lastName,
      token,
      res
    }))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  }
}

const createCharge = ({
  _id,
  address,
  cart,
  email,
  firstName,
  lastName,
  token,
  res
}) => {
  const stripe = require("stripe")(process.env.STRIPE_SK_TEST)
  stripe.charges.create({
    amount: Math.round(cart.total),
    currency: "usd",
    source: token,
    description: `${process.env.APP_NAME} Order`
  })
  .then(charge => {
    const newOrder = new Order({
      user: _id,
      paymentId: charge.id,
      total: cart.total,
      firstName,
      lastName,
      email,
      address: address.values,
      cart
    })
    newOrder.save()
    .then(order => {
      res.send(order)
      const { email, firstName, lastName, cart, address } = order
      const { name, phone, street, city, state, zip } = address
      sendEmail1({
        to: email,
        toSubject: 'Thank you for your order!',
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
            ${order.cart.items.map(item => `<li><img src=${item.image.src} alt="item" height="32px" width="auto"/> ${item.name} ${item.productId}, qty: ${item.productQty}</li>`)}
          </ul>
          <div>Address:</div>
          <div>${name}</div>
          <div>${phone}</div>
          <div>${street}</div>
          <div>${city}, ${state} ${zip}</div>
          <p>Once shipped, you can mark the item as shipped in at ${process.env.ROOT_URL}/admin/orders to send confirmation to ${firstName}.</p>
        `
      })
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ error: error })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}


export const get = (req, res) => {
  const isAdmin = req.user.roles.some(role => role === 'admin' || role === 'owner')
  if (isAdmin) {
    Order.find({})
      .then(orders => res.send(orders))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
  } else {
    Order.find({ user: req.user._id })
    .then(orders => res.send(orders))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  }
}



export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type } = req.body
  switch (type) {
    case 'SHIPPED':
      Order.findOneAndUpdate(
        { _id },
        { $set: { shipped: true, shipDate: new Date() }},
        { new: true }
      )
      .then(order => {
        const { email, firstName, lastName, cart, address } = order
        const { name, phone, street, city, state, zip } = address
        res.send(order)
        sendEmail1({
          to: email,
          toSubject: 'Your order has shipped!',
          toBody: `
            <p>Hi ${firstName},</p>
            <p>Order ${order._id} is on it's way!</p>
          `,
          fromSubject: `Order shipped!`,
          fromBody: `
            <p>Order ${order._id} has been changed to shipped!</p>
            <div>Order: ${order._id}</div>
            <div>Total: ${formatPrice(order.cart.total)}</div>
            <div>Quantity: ${order.cart.quantity}</div>
            <div>Items:</div>
            <ul>
              ${order.cart.items.map(item => `<li>${item.productQty} of ${item.name} ${item.productId}</li>`)}
            </ul>
            <div>Address:</div>
            <div>${name}</div>
            <div>${phone}</div>
            <div>${street}</div>
            <div>${city}, ${state} ${zip}</div>
          `})
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break
    default:
      return
  }
}
