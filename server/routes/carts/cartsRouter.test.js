import expect from 'expect'
import request from 'supertest'
import app from '../../server'
import CartModel from './CartModel'

beforeEach((done) => {
  CartModel.remove({}).then(() => {
    done()
  })
})

const productId = 'HLJE4JL36LJOHNMLOH6'
const productQty = 1000

describe('POST /api/carts', () => {
  it('should create a new cart', (done) => {
    request(app)
      .post('/api/carts')
      .send({
        productId,
        productQty
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.productId).toBe(productId)
        expect(res.body.productQty).toBe(productQty)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find()
          .then((carts) => {
            expect(carts.length).toBe(1)
            expect(carts[0].productId).toBe(productId)
            expect(carts[0].productQty).toBe(productQty)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create cart with invalid body data', (done) => {
    request(app)
      .post('/api/carts')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find()
          .then((carts) => {
            expect(carts.length).toBe(0)
            done()
          })
          .catch(err => done(err))
      })
  })
})
