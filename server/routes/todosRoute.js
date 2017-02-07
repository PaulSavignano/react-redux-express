import express from 'express'
import TodoModel from '../models/TodoModel'

const router = express.Router()

const todosRoute = router.post('/', (req, res) => {
  const todo = new TodoModel({
    text: req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

export default todosRoute
