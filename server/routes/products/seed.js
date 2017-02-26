import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'

import ProductModel from './ProductModel'

export const products = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), uuid: uuidV1(), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), uuid: uuidV1(), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 },
  { _id: ObjectID('58a52f604d564945a7c722a9'), uuid: uuidV1(), name: 'Test 3 Product', description: 'Test 3 Description', price: 3000 }
]

export const populateProducts = (done) => {
  ProductModel.remove({}).then(() => {
    const productOne = new ProductModel(products[0]).save()
    const productTwo = new ProductModel(products[1]).save()
    const productThree = new ProductModel(products[2]).save()
    return Promise.all([productOne, productTwo, productThree])
  }).then(() => done())
}
