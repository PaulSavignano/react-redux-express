import express from 'express'
import { ObjectID } from 'mongodb'
import CartModel from './CartModel'
import ProductModel from '../products/ProductModel'

const cartsRouter = express.Router()

cartsRouter.post('/', (req, res) => {
  const cart = new CartModel({
    uuid: req.body.uuid,
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
      if (carts.length) {
        const cartProductIds = carts.map(cartPro => cartPro.productId)
        ProductModel.find({ _id: { $in: cartProductIds }})
          .then(products => {
            const cartProducts = carts.map(cart => {
              const product = products.find(pro => {
                return pro._id.toHexString() === cart.productId.toHexString()
              })
              return {
                _id: cart._id,
                uuid: cart.uuid,
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

export default cartsRouter
