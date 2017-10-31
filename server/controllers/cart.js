import { ObjectID } from 'mongodb'
import moment from 'moment'

import Cart from '../models/Cart'
import Product from '../models/Product'


export const add = (req, res) => {
  const {
    body: {
      productId,
      productQty
    },
    hostname
  } = req
  Product.findOne(
    { _id: productId, hostname }
  )
  .then(product => {
    const { price, name } = product.values
    const cart = new Cart({
      hostname,
      items: [{
        productId,
        productQty,
        image: { src: product.image.src },
        name,
        price,
        total: productQty * price
      }],
      quantity: productQty,
      total: productQty * price + ((productQty * price) * .075),
      subTotal: productQty * price,
    })
    cart.save()
    .then(doc => res.header('cart', doc._id).send(doc))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const getId = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send()
  const {
    hostname,
    params: { _id }
  } = req
  Cart.findOne({ _id, hostname })
  .then(cart => {
    if (!cart) return Promise.reject({ error: 'Cart not found'})
    res.send(cart)
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}




export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    body: { type, productId, productQty },
    hostname,
    params: { _id }
  } = req
  Cart.findOne({ _id, hostname })
    .then(cart => {
      if (!cart) return Promise.reject('cart not found')
      const index = cart.items.map(i => i.productId.toHexString()).indexOf(productId)
      if (index !== -1) {
        switch (type) {
          case 'ADD_TO_CART':
            cart.total = cart.total + ((cart.items[index].price * productQty) + (cart.items[index].price * productQty) * .075)
            cart.subTotal = cart.subTotal + (cart.items[index].price * productQty)
            cart.quantity = cart.quantity + productQty
            cart.items[index] = {
              total: cart.items[index].price * (cart.items[index].productQty + productQty),
              price: cart.items[index].price,
              image: cart.items[index].image,
              name: cart.items[index].name,
              productQty: cart.items[index].productQty + productQty,
              productId: cart.items[index].productId
            }
            cart.save()
            .then(cart => res.send(cart))
            .catch(error => { console.error(error); res.status(400).send({ error })})
            break
          case 'REDUCE_FROM_CART':
            if (cart.items[index].productQty - productQty > 0) {
              cart.total = cart.total - ((cart.items[index].price * productQty) + (cart.items[index].price * productQty) * .075)
              cart.subTotal = cart.subTotal - (cart.items[index].price * productQty)
              cart.quantity = cart.quantity - productQty
              cart.items[index] = {
                total: cart.items[index].price * (cart.items[index].productQty - productQty),
                price: cart.items[index].price,
                image: cart.items[index].image,
                name: cart.items[index].name,
                productQty: cart.items[index].productQty - productQty,
                productId: cart.items[index].productId
              }
              cart.save()
              .then(cart => res.send(cart))
              .catch(error => { console.error(error); res.status(400).send({ error })})
            } else {
              cart.total = cart.total - ((cart.items[index].price * productQty) + (cart.items[index].price * productQty) * .075)
              cart.subTotal = cart.subTotal - (cart.items[index].price * productQty)
              cart.quantity = cart.quantity - productQty
              cart.items = cart.items.filter(item =>
                item.productId.toHexString() !== productId
              )
              cart.save()
              .then(cart => res.send(cart))
              .catch(error => { console.error(error); res.status(400).send({ error })})
            }
            break
          case 'REMOVE_FROM_CART':
            cart.total = cart.total - ((cart.items[index].price * cart.items[index].productQty) + ((cart.items[index].price * cart.items[index].productQty) * .075))
            cart.subTotal = cart.subTotal - (cart.items[index].price * cart.items[index].productQty)
            cart.quantity = cart.quantity - cart.items[index].productQty
            cart.items = cart.items.filter(item =>
              item.productId.toHexString() !== productId
            )
            cart.save()
            .then(cart => res.send(cart))
            .catch(error => { console.error(error); res.status(400).send({ error })})
            break
          default:
            return cart
        }
      } else {
        Product.findOne({ _id: productId, hostname })
          .then(pro => {
            cart.total = cart.total + ((pro.values.price * productQty) + (pro.values.price * productQty) * .075)
            cart.subTotal = cart.subTotal + (pro.values.price * productQty)
            cart.quantity = cart.quantity + productQty
            const item = {
              productId,
              productQty,
              image: pro.image,
              name: pro.values.name,
              price: pro.values.price,
              total: pro.values.price * productQty
            }
            cart.items.push(item)
            cart.save()
            .then(cart => res.send(cart))
            .catch(error => { console.error(error); res.status(400).send({ error })})
          })
      }
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const remove = (req, res) => {
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Cart.findOneAndRemove({ _id, hostname })
  .then(cart => res.send(cart))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
