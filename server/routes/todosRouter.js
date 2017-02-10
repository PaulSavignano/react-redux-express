import express from 'express'
import TodoModel from '../models/TodoModel'

const todosRouter = express.Router()

todosRouter.post('/', (req, res) => {
  const todo = new TodoModel({
    text: req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

todosRouter.get('/', (req, res) => {
  TodoModel.find({})
    .then(todos => res.send({ todos }))
    .catch(err => res.status(400).send(err))
})

export default todosRouter
