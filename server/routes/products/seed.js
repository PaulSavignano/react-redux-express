import { ObjectID } from 'mongodb'
import { userSeeds } from '../users/seed'

export { userSeeds } from '../users/seed'

import ProductModel from './ProductModel'

export const productSeeds = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 }
]

export const populateProducts = (done) => {
  ProductModel.remove({}).then(() => {
    const productOne = new ProductModel(productSeeds[0]).save()
    const productTwo = new ProductModel(productSeeds[1]).save()
    return Promise.all([productOne, productTwo])
  }).then(() => done())
}
