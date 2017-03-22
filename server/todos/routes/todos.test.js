import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'

import app from '../../server'
import Todo from './Todo'
import { userSeeds, todoSeeds, populateTodos } from './seed'

beforeEach(populateTodos)



describe('POST /api/todos', () => {
  it('should create a new todo', (done) => {
    request(app)
      .post('/api/todos')
      .set('x-auth', userSeeds[0].tokens[0].token)
      .send(todoSeeds[0])
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todoSeeds[0].text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({ _id: todoSeeds[0]._id })
          .then((todo) => {
            expect(todo.length).toBe(1)
            expect(todo[0].text).toBe(todoSeeds[0].text)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create todo with invalid body data', (done) => {
    const text = 'Test todo should fail with no todo'
    request(app)
      .post('/api/todos')
      .set('x-auth', userSeeds[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2)
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
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1)
      })
      .end(done)
  })
})



describe('GET /api/todos/:_id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/api/todos/${todoSeeds[0]._id.toHexString()}`)
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todoSeeds[0].text)
      })
      .end(done)
  })
  it('should not return todo doc created by other user', (done) => {
    request(app)
      .get(`/api/todos/${todoSeeds[1]._id.toHexString()}`)
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/api/todos/${userSeeds[0]._id.toHexString()}`)
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', (done) => {
    const _id = '123abc'
    request(app)
      .get(`/api/todos/${_id}`)
      .set('x-auth', userSeeds[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
})



describe('DELETE /api/todos/:_id', () => {
  it('should delete a todo', (done) => {
    const hexId = todoSeeds[1]._id.toHexString()
    request(app)
      .delete(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err) => {
        if (err) return done(err)
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should delete a todo', (done) => {
    const hexId = todoSeeds[0]._id.toHexString()
    request(app)
      .delete(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[1].tokens[0].token)
      .expect(404)
      .end((err) => {
        if (err) return done(err)
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .set('x-auth', userSeeds[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
})



describe('PATCH /api/todos/:_id', () => {
  it('should update the todo', (done) => {
    const hexId = todoSeeds[0]._id.toHexString()
    const text = 'This should be the new text'
    request(app)
      .patch(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[0].tokens[0].token)
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
  it('should not update the todo created by other user', (done) => {
    const hexId = todoSeeds[0]._id.toHexString()
    const text = 'This should be the new text'
    request(app)
      .patch(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[1].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(404)
      .end(done)
  })
  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todoSeeds[1]._id.toHexString()
    const text = 'This should be the new text!!'
    request(app)
      .patch(`/api/todos/${hexId}`)
      .set('x-auth', userSeeds[1].tokens[0].token)
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
