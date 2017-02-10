import expect from 'expect'
import request from 'supertest'
import app from '../server'
import CartModel from '../models/CartModel'

beforeEach((done) => {
  CartModel.remove({}).then(() => {
    done()
  })
})

const productId = 'HLJE4JL36LJOHNMLOH6'
const quantity = 1000

describe('POST /api/cart', () => {
  it('should create a new cart product', (done) => {
    request(app)
      .post('/api/cart')
      .send({
        productId: 'HLJE4JL36LJOHNMLOH6',
        quantity: 1000
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.productId).toBe(productId)
        expect(res.body.quantity).toBe(quantity)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find()
          .then((cart) => {
            expect(cart.length).toBe(1)
            expect(cart[0].productId).toBe(productId)
            expect(cart[0].quantity).toBe(quantity)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create cart product with invalid body data', (done) => {
    request(app)
      .post('/api/cart')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find()
          .then((cart) => {
            expect(cart.length).toBe(0)
            done()
          })
          .catch(err => done(err))
      })
  })
})
