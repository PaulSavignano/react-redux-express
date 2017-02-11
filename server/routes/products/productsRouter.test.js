import expect from 'expect'
import request from 'supertest'
import app from '../../server'
import ProductModel from './ProductModel'

beforeEach((done) => {
  ProductModel.remove({}).then(() => {
    done()
  })
})

const name = 'Test product'
const description = 'A test product for route test'
const price = 1000

describe('POST /api/products', () => {
  it('should create a new product', (done) => {
    request(app)
      .post('/api/products')
      .send({
        name: 'Test product',
        description: 'A test product for route test',
        price: 1000
      })
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
        ProductModel.find()
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
            expect(products.length).toBe(0)
            done()
          })
          .catch(err => done(err))
      })
  })
})
