import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'

import app from '../../server'
import TodoModel from './TodoModel'

const todos = [
  { _id: new ObjectID(), text: 'First test todo' },
  { _id: new ObjectID(), text: 'Second test todo' },
  { _id: new ObjectID(), text: 'Third test todo' }
]

beforeEach((done) => {
  TodoModel.remove({})
    .then(() => TodoModel.insertMany(todos))
    .then(() => done())
})

describe('POST /api/todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo test'
    request(app)
      .post('/api/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        TodoModel.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create todo with invalid body data', (done) => {
    const text = 'Test todo should fail with no todo'
    request(app)
      .post('/api/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        TodoModel.find()
          .then((todos) => {
            expect(todos.length).toBe(3)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /api/todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3)
      })
      .end(done)
  })
})

describe('GET /api/todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/api/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })
  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/api/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', (done) => {
    const id = '123abc'
    request(app)
      .get(`/api/todos/${id}`)
      .expect(404)
      .end(done)
  })
})
