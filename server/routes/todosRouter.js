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
  const cities = [
    {id: 1, text: 'Play with Weston'},
    {id: 2, text: 'Walk Pepper'},
    {id: 3, text: 'Get to work'}
  ]
  res.json(cities)
})

export default todosRouter
