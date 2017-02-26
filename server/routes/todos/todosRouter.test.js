import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'

import app from '../../server'
import TodoModel from './TodoModel'
import { todos, populateTodos } from './seed'

beforeEach(populateTodos)

describe('POST /api/todos', () => {
  it('should create a new todo', (done) => {
    const todo = { uuid: uuidV1(), text: 'Test creating a new todo' }
    request(app)
      .post('/api/todos')
      .send(todo)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todo.text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        TodoModel.find({ uuid: todo.uuid })
          .then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(todo.text)
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
        expect(res.body.length).toBe(3)
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

describe('DELETE /api/todos/:_id', () => {
  it('should delete a todo', (done) => {
    const hexId = todos[1]._id.toHexString()
    request(app)
      .delete(`/api/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err) => {
        if (err) return done(err)
        TodoModel.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/api/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /api/todos/:_id', () => {
  it('should update the todo', (done) => {
    const hexId = todos[0]._id.toHexString()
    const text = 'This should be the new text'
    request(app)
      .patch(`/api/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })
  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString()
    const text = 'This should be the new text!!'
    request(app)
      .patch(`/api/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
})
