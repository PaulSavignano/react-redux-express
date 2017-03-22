import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'

import app from '../../server'
import User from './User'
import { userSeeds, populateUsers } from './seed'

beforeEach(populateUsers)

describe('GET /api/users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(userSeeds[0]._id.toHexString())
        expect(res.body.email).toBe(userSeeds[0].email)
      })
      .end(done)
  })
  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /api/users/signup', () => {
  it('should create a user', (done) => {
    const email = 'example@example.com'
    const password = '123abc'
    request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end(err => {
        if (err) {
          return done(err)
        }
        User.findOne({ email })
          .then(user => {
            expect(user).toExist()
            expect(user.password).toNotBe(password)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return validation errors if request invalid', (done) => {
    const email = 'example'
    const password = '123'
    request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .expect(400)
      .end(done)
  })
  it('should not create user if email in use', (done) => {
    const email = userSeeds[0].email
    const password = userSeeds[0].password
    request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .expect(400)
      .end(done)
  })
})

describe('POST /users/signin', () => {
  it('should signin user and return auth token', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        email: userSeeds[1].email,
        password: userSeeds[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(userSeeds[1]._id)
          .then(user => {
            expect(user.tokens[1]).toInclude({
              access: 'auth',
              token: res.headers['x-auth']
            })
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should reject invalid signin', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        email: userSeeds[1].email,
        password: userSeeds[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toNotExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(userSeeds[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(1)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('DELETE /api/users/me/token', () => {
  it('should remove auth token on signout', () => {
    request(app)
      .delete('/api/users/me/token')
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(userSeeds[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0)
            done()
          })
          .catch(err => done(err))
      })
  })
})
