import { ObjectID } from 'mongodb'

import Address from '../models/Address'
import User from '../models/User'
import Order from '../models/Order'
import sendGmail from '../utils/sendGmail'

const formatPrice = (cents) => `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const add = (req, res, next) => {
  const {
    body: {
      stripeToken,
      fullAddress,
      name,
      phone,
      street,
      city,
      state,
      zip,
      cart
    },
    hostname,
    user: { _id },
  } = req
  if (fullAddress === 'newAddress') {
    const newAddress = new Address({
      hostname,
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
    newAddress.save()
    .then(address => {
      return User.findOneAndUpdate(
        { _id, hostname },
        { $push: { addresses: address._id }},
        { new: true }
      )
      .then(user => createCharge({
        address,
        cart,
        stripeToken,
        res,
        req,
        user
      }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  } else {
    return Address.findOne({ _id: fullAddress, hostname })
    .then(address => {
      return User.findOne({ _id })
      .then(user => createCharge({
        address,
        cart,
        stripeToken,
        res,
        req,
        user
      }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  }
}

const createCharge = ({
  address,
  cart,
  stripeToken,
  res,
  req,
  user
}) => {
  const { _id, values: { firstName, lastName, email }} = user
  const { hostname } = req
  const stripe = require("stripe")(process.env.STRIPE_SK_TEST)
  return stripe.charges.create({
    amount: Math.round(cart.total),
    currency: "usd",
    source: stripeToken,
    description: `${hostname} Order`
  })
  .then(charge => {
    const newOrder = new Order({
      address: address.values,
      cart,
      email,
      firstName,
      hostname,
      lastName,
      paymentId: charge.id,
      total: cart.total,
      user: _id,
    })
    newOrder.save()
    .then(order => {
      res.send({ order, user })
      const { email, firstName, lastName, cart, address } = order
      const { name, phone, street, city, state, zip } = address

      const htmlOrder = `
        <div style="font-weight: 900">Order Summary</div>
        <div>Order: ${order._id}</div>
        <div>Total: ${formatPrice(order.cart.total)}</div>
        <div>Quantity: ${order.cart.quantity}</div>
        <div>Items:</div>
        <ol>
          ${order.cart.items.map(item => (
            `<li style="display:flex;flex-flow:row wrap;align-items:center;font-family:inherit;">
              ${item.productQty} of <img src=${item.image.src} alt="order item" height="32px" width="auto" style="margin-left:8px;margin-right:8px"/> ${item.name} ${item.productId}
            </li>`
          ))}
        </ol>
        <div style="font-weight: 900">Delivery Summary</div>
        <div>${name}</div>
        <div>${phone}</div>
        <div>${street}</div>
        <div>${city}, ${state} ${zip}</div>
      `
      sendGmail({
        hostname,
        to: email,
        toSubject: 'Thank you for your order!',
        toBody: `
          <p>Hi ${firstName},</p>
          <p>Thank you for your recent order ${order._id}.  We are preparing your order for delivery and will send you a confirmation once it has shipped.  Please don't hesitate to reach out regarding anything we can with in the interim.</p>
          ${htmlOrder}
        `,
        fromSubject: `New order received!`,
        fromBody: `
          <p>${firstName} ${lastName} just placed order an order!</p>
          ${htmlOrder}
          <p>Once shipped, you can mark the item as shipped in at <a href="${hostname}/admin/orders">${hostname}/admin/orders</a> to send confirmation to ${firstName}.</p>
        `
      })
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const get = (req, res) => {
  const {
    hostname,
    user
  } = req
  Order.find({ user: user._id, hostname })
  .then(orders => res.send(orders))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const getAdmin = (req, res) => {
  const { hostname } = req
  Order.find({ hostname })
  .then(orders => res.send(orders))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    body: { type },
    hostname,
    params: { _id }
  } = req
  switch (type) {
    case 'SHIPPED':
      Order.findOneAndUpdate(
        { _id, hostname },
        { $set: { shipped: true, shipDate: new Date() }},
        { new: true }
      )
      .then(order => {
        const { email, firstName, lastName, cart, address } = order
        const { name, phone, street, city, state, zip } = address
        res.send(order)
        sendGmail({
          hostname,
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
        .catch(error => { console.error(error); res.status(400).send({ error })})
      break
    default:
      return
  }
}
