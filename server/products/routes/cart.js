import express from 'express'
import { ObjectID } from 'mongodb'
import Cart from '../models/Cart'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'

const carts = express.Router()

// Create
carts.post('/', authenticate(['user']), (req, res) => {
  const cart = new Cart({
    _owner: req.user._id,
    productId: req.body.productId,
    productQty: req.body.productQty
  })
  cart.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Read
carts.get('/', authenticate(['user']), (req, res) => {
  Cart.find({ _owner: req.user._id })
    .then(carts => {
      if (carts.length) {
        const cartProductIds = carts.map(cartPro => cartPro.productId)
        Product.find({ _id: { $in: cartProductIds }})
          .then(products => {
            const cartProducts = carts.map(cart => {
              const product = products.find(pro => {
                return pro._id.toHexString() === cart.productId.toHexString()
              })
              return {
                _id: cart._id,
                productId: product._id,
                productQty: cart.productQty,
                name: product.name,
                description: product.description,
                price: product.price
              }
            })
            res.send(cartProducts)
          })
          .catch(err => res.status(400).send(err))
      } else {
        res.send(carts)
      }
    })
    .catch(err => res.status(400).send(err))
})

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
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
})



// Update
carts.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Cart.findByIdAndUpdate(_id, {$set: body}, {new: true} )
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
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
