import express from 'express'
import { ObjectID } from 'mongodb'
import CartModel from './CartModel'
import ProductModel from '../products/ProductModel'
import { authenticate } from '../../middleware/authenticate'

const cartsRouter = express.Router()


// Create
cartsRouter.post('/', authenticate(['user']), (req, res) => {
  const cartId = req.header('cart')
  const { body } = req
  console.log(cartId)
  if (cartId !== 'null' && cartId !== 'undefined') {
    console.log('inside cartId')
    CartModel.findOneAndUpdate({ _id: cartId }, {$set: { products: { body } }}, {upsert:true} )
      .then((cart) => {
        if (!todo) {
          return res.status(404).send()
        }
        res.send({ cart })
      })
      .catch((err) => res.status(400).send(err))
  } else {
    console.log('inside new cart')
    const Cart = new CartModel({
      products: [{
        productId: req.body.productId,
        productQty: req.body.productQty
      }]
    })
    Cart.save()
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send({ cart })
      })
      .catch((err) => res.status(400).send(err))
  }
})



// Read
cartsRouter.get('/', (req, res) => {
  CartModel.find({})
    .then(carts => {
      if (carts.length) {
        const cartProductIds = carts.products.map(cartPro => cartPro.productId)
        console.log(cartProductIds)
        ProductModel.find({ _id: { $in: cartProductIds }})
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

cartsRouter.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  CartModel.findById(_id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
})



// Update
cartsRouter.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  CartModel.findByIdAndUpdate(_id, {$set: body}, {new: true} )
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
})



// Delete
cartsRouter.delete('/:_id', (req, res) => {
  const _id = req.params._id
  CartModel.findOneAndRemove({ _id })
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send(err))
})




export default cartsRouter
