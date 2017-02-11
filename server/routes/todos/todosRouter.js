import express from 'express'
import { ObjectID } from 'mongodb'
import TodoModel from './TodoModel'

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

todosRouter.get('/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  TodoModel.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch((err) => res.status(400).send())
})

export default todosRouter
