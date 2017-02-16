import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'

import app from '../../server'
import ProductModel from './ProductModel'

const productOneId = ObjectID('58a52f604d564945a7c722a7')
const productTwoId = ObjectID('58a52f604d564945a7c722a8')
const productThreeId = ObjectID('58a52f604d564945a7c722a9')
const products = [
  { _id: productOneId, name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: productTwoId, name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 },
  { _id: productThreeId, name: 'Test 3 Product', description: 'Test 3 Description', price: 3000 }
]

const populateProducts = (done) => {
  ProductModel.remove({}).then(() => {
    const productOne = new ProductModel(products[0]).save()
    const productTwo = new ProductModel(products[1]).save()
    const productThree = new ProductModel(products[2]).save()
    return Promise.all([productOne, productTwo, productThree])
  }).then(() => done())
}

beforeEach(populateProducts)

describe('POST /api/products', () => {
  it('should create a new product', (done) => {
    const name = 'Test product'
    const description = 'A test product for route test'
    const price = 1000
    request(app)
      .post('/api/products')
      .send({ name, description, price })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name)
        expect(res.body.description).toBe(description)
        expect(res.body.price).toBe(price)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        ProductModel.find({ name, description, price })
          .then((products) => {
            expect(products.length).toBe(1)
            expect(products[0].name).toBe(name)
            expect(products[0].description).toBe(description)
            expect(products[0].price).toBe(price)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create product with invalid body data', (done) => {
    request(app)
      .post('/api/products')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        ProductModel.find()
          .then((products) => {
            expect(products.length).toBe(3)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /api/products', () => {
  it('should get all products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .expect((res) => {
        expect(res.body.products.length).toBe(3)
      })
      .end(done)
  })
})

describe('GET /api/products/:id', () => {
  it('should return product doc', (done) => {
    request(app)
      .get(`/api/products/${products[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.product.text).toBe(products[0].text)
      })
      .end(done)
  })
  it('should return 404 if product not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/api/products/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', (done) => {
    const id = '123abc'
    request(app)
      .get(`/api/products/${id}`)
      .expect(404)
      .end(done)
  })
})
