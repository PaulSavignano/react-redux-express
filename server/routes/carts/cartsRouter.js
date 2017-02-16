import express from 'express'
import { ObjectID } from 'mongodb'
import CartModel from './CartModel'
import ProductModel from '../products/ProductModel'

const cartsRouter = express.Router()

cartsRouter.post('/', (req, res) => {
  const cart = new CartModel({
    productId: req.body.productId,
    productQty: req.body.productQty
  })
  cart.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

cartsRouter.get('/', (req, res) => {
  CartModel.find({})
    .then(carts => {
      const cartProductIds = carts.map(cartPro => cartPro.productId)
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
              price: product.price
            }
          })
          res.send(cartProducts)
        })
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
})

cartsRouter.get('/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  CartModel.findById(id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send({ cart })
    })
    .catch((err) => res.status(400).send())
})

export default cartsRouter
