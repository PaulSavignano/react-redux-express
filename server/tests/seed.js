import { ObjectID } from 'mongodb'

import CartModel from './CartModel'
import { userSeeds } from '../users/seed'
import ProductModel from './ProductModel'

export const productSeeds = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 }
]

export const populateProducts = (done) => {
  ProductModel.findOneAndDelete({}).then(() => {
    const productOne = new ProductModel(productSeeds[0]).save()
    const productTwo = new ProductModel(productSeeds[1]).save()
    return Promise.all([productOne, productTwo])
  }).then(() => done())
}


export const cartSeeds = [
  { _id: new ObjectID(), productId: productSeeds[0]._id, productQty: 6 },
  { _id: new ObjectID(), productId: productSeeds[1]._id, productQty: 9 },
]

export const populateCarts = (done) => {
  CartModel.findOneAndDelete({})
    .then(() => CartModel.insertMany(cartSeeds))
    .then(() => done())
}
