import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'

import app from '../../server'
import Product from '../models/Product'
import Cart from './Cart'
import { productSeeds, cartSeeds, populateCarts } from '../seed'

beforeEach(populateCarts)


describe('POST /api/carts', () => {
  it('should create a new cart', (done) => {
    const product = { productId: productSeeds[0]._id, productQty: 12 }
    request(app)
      .post('/api/carts')
      .send(product)
      .expect(200)
      .expect((res) => {
        expect(res.body.productId).toBe(product.productId.toHexString())
        expect(res.body.productQty).toBe(product.productQty)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Cart.find({ productId: product.productId })
          .then((carts) => {
            expect(carts.length).toBe(1)
            expect(carts[0].productId.toHexString()).toBe(product.productId.toHexString())
            expect(carts[0].productQty).toBe(product.productQty)
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
        Cart.find()
          .then((carts) => {
            expect(carts.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /api/carts', () => {
  it('should get all carts', (done) => {
    request(app)
      .get('/api/carts')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /api/carts/:id', () => {
  it('should return cart doc', (done) => {
    request(app)
      .get(`/api/carts/${cartSeeds[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart.productQty).toBe(cartSeeds[0].productQty)
      })
      .end(done)
  })
  it('should return 404 if cart not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/api/carts/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', (done) => {
    const _id = '123abc'
    request(app)
      .get(`/api/carts/${_id}`)
      .expect(404)
      .end(done)
  })
})


describe('DELETE /carts/:_id', () => {
  it('should delete a cart', (done) => {
    const hexId = cartSeeds[1]._id.toHexString()
    request(app)
      .delete(`/api/carts/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart._id).toBe(hexId)
      })
      .end((err) => {
        if (err) return done(err)
        Cart.findById(hexId)
          .then((cart) => {
            expect(cart).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return 404 if cart not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/api/carts/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/carts/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /api/carts/:_id', () => {
  it('should update the cart', (done) => {
    const hexId = cartSeeds[0]._id.toHexString()
    const update = {
      productId: productSeeds[1]._id,
      productQty: 99
    }
    request(app)
      .patch(`/api/carts/${hexId}`)
      .send(update)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart.productId).toBe(update.productId.toHexString())
        expect(res.body.cart.productQty).toBe(update.productQty)
      })
      .end(done)
  })
})
