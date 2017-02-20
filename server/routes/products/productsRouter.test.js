import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'

import app from '../../server'
import ProductModel from './ProductModel'

const products = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), uuid: uuidV1(), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), uuid: uuidV1(), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 },
  { _id: ObjectID('58a52f604d564945a7c722a9'), uuid: uuidV1(), name: 'Test 3 Product', description: 'Test 3 Description', price: 3000 }
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
    const product = { uuid: uuidV1(), name: 'Test 4 Product', description: 'Test 4 Description', price: 9000 }
    request(app)
      .post('/api/products')
      .send(product)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(product.name)
        expect(res.body.description).toBe(product.description)
        expect(res.body.price).toBe(product.price)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        ProductModel.find({ uuid: product.uuid })
          .then((products) => {
            expect(products.length).toBe(1)
            expect(products[0].name).toBe(product.name)
            expect(products[0].description).toBe(product.description)
            expect(products[0].price).toBe(product.price)
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
        expect(res.body.length).toBe(3)
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



describe('DELETE /products/:_id', () => {
  it('should delete a product', (done) => {
    const hexId = products[1]._id.toHexString()
    request(app)
      .delete(`/api/products/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.product._id).toBe(hexId)
      })
      .end((err) => {
        if (err) return done(err)
        ProductModel.findById(hexId)
          .then((product) => {
            expect(product).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return 404 if product not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/api/products/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/products/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /api/products/:_id', () => {
  it('should update the product', (done) => {
    const hexId = products[0]._id.toHexString()
    const update = {
      name: 'New name from productsRouter test',
      description: 'New description',
      price: 9999
    }
    request(app)
      .patch(`/api/products/${hexId}`)
      .send(update)
      .expect(200)
      .expect((res) => {
        expect(res.body.product.name).toBe(update.name)
        expect(res.body.product.description).toBe(update.description)
        expect(res.body.product.price).toBeA('number')
      })
      .end(done)
  })
})
