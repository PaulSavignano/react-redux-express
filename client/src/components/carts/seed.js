import uuidV1 from 'uuid/v1'
import products from '../products/seed'

const carts = [
  { uuid: uuidV1(), productId: products[0]._id, productQty: 1, name: products[0].name, description: products[0].description, price: products[0].price },
  { uuid: uuidV1(), productId: products[1]._id, productQty: 2, name: products[1].name, description: products[1].description, price: products[1].price },
  { uuid: uuidV1(), productId: products[2]._id, productQty: 3, name: products[2].name, description: products[2].description, price: products[2].price }
]

export default carts
