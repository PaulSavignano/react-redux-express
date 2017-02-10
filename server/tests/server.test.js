import expect from 'expect'
import request from 'supertest'
import app from '../server'
import TodoModel from '../models/TodoModel'

beforeEach((done) => {
  TodoModel.remove({}).then(() => {
    done()
  })
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
        if (err) return done(err)
        TodoModel.find()
          .then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })
})
