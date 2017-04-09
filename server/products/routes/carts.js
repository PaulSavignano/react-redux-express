import express from 'express'
import { ObjectID } from 'mongodb'
import Cart from '../models/Cart'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'

const carts = express.Router()

// Create
carts.post('/', (req, res) => {
  const { productId, productQty, name, price } = req.body
  Product.findOne({ _id: productId })
    .then(product => {
      const cart = new Cart({
        total: productQty * product.price,
        quantity: productQty,
        items: [{
          productId,
          productQty,
          name: product.name,
          price: product.price,
          total: productQty * product.price
        }]
      })
      cart.save()
        .then(doc => {
          res.header('cart', doc._id).send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
})



// Read

carts.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Cart.findById(_id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send(cart)
    })
    .catch((err) => res.status(400).send(err))
})



// Update
carts.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Cart.findOne({ _id })
    .then(cart => {
      const index = cart.items.map(i => i.productId.toHexString()).indexOf(body.product.productId)
      if (index !== -1) {
        console.log('exists')
        cart.total = cart.total + (cart.items[index].price * body.product.productQty)
        cart.quantity = cart.quantity + body.product.productQty
        cart.items[index] = {
          total: cart.items[index].total + (cart.items[index].price * body.product.productQty),
          price: cart.items[index].price,
          name: cart.items[index].name,
          productQty: cart.items[index].productQty + body.product.productQty,
          productId: cart.items[index].productId
        }
        cart.save()
          .then(cart => {
            console.log('sent existing response')
            res.send(cart)
          })
      } else {
        Product.findOne({ _id: body.product.productId })
          .then(product => {
            const item = {
              productId: body.product.productId,
              productQty: body.product.productQty,
              name: body.product.name,
              price: product.price,
              total: product.price * body.product.productQty
            }
            cart.total = cart.total + item.total
            cart.quantity = cart.quantity + item.productQty
            cart.items.push(item)
            cart.save()
              .then(cart => {
                console.log('sent new response')
                res.send(cart)
              })
          })
      }
  })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Delete
carts.delete('/:_id', (req, res) => {
  const _id = req.params._id
  Cart.findOneAndRemove({ _id })
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
})




export default carts
