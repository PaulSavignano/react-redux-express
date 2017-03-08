import { ObjectID } from 'mongodb'
import CartModel from './CartModel'

import { productSeeds } from '../products/seed'

export { productSeeds } from '../products/seed'

export const cartSeeds = [
  { _id: new ObjectID(), productId: productSeeds[0]._id, productQty: 6 },
  { _id: new ObjectID(), productId: productSeeds[1]._id, productQty: 9 },
]

export const populateCarts = (done) => {
  CartModel.remove({})
    .then(() => CartModel.insertMany(cartSeeds))
    .then(() => done())
}
