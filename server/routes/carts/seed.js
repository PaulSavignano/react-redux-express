import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'

import ProductModel from '../products/ProductModel'
import CartModel from './CartModel'

export const products = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), uuid: uuidV1(), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), uuid: uuidV1(), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 },
  { _id: ObjectID('58a52f604d564945a7c722a9'), uuid: uuidV1(), name: 'Test 3 Product', description: 'Test 3 Description', price: 3000 }
]

export const carts = [
  { _id: new ObjectID(), uuid: uuidV1(), productId: products[0]._id, productQty: 6 },
  { _id: new ObjectID(), uuid: uuidV1(), productId: products[1]._id, productQty: 9 },
]

export const populateProducts = (done) => {
  ProductModel.remove({})
    .then(() => ProductModel.insertMany(products))
    .then(() => done())
}

export const populateCarts = (done) => {
  CartModel.remove({})
    .then(() => CartModel.insertMany(carts))
    .then(() => done())
}
