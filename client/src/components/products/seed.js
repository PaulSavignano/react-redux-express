import uuidV1 from 'uuid/v1'

const products = [
  { _id: 'A1B2C3', uuid: uuidV1(), name: 'React', description: 'React development', price: 300000 },
  { _id: 'D4E5F6', uuid: uuidV1(), name: 'Express', description: 'Express server development', price: 400000 },
  { _id: 'G7H8I9', uuid: uuidV1(), name: 'Ecommerce', description: 'Ecommerce app development', price: 700000 },
]

export default products
