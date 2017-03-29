import express from 'express'
import Order from '../models/Product'
import { authenticate } from '../../middleware/authenticate'

const orders = express.Router()

orders.get('/', authenticate(['user']), (req, res) => {
  Order.find({ user: req.user._id })
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send(err))
})

export default orders
