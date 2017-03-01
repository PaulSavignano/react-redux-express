import express from 'express'
import { ObjectID } from 'mongodb'
import TodoModel from './TodoModel'
import { authenticate } from '../../middleware/authenticate'

const todosRouter = express.Router()

todosRouter.post('/', authenticate, (req, res) => {
  const todo = new TodoModel({
    text: req.body.text,
    _creator: req.user._id
  })
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})

todosRouter.get('/', authenticate, (req, res) => {
  TodoModel.find({ _creator: req.user._id })
    .then(todos => res.send(todos))
    .catch(err => res.status(400).send(err))
})

todosRouter.get('/:_id', authenticate, (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  TodoModel.findOne({
    _id,
    _creator: req.user._id
  })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch((err) => res.status(400).send())
})

todosRouter.delete('/:_id', authenticate, (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  TodoModel.findOneAndRemove({
    _id,
    _creator: req.user._id
  })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch((err) => res.status(400).send(err))
})

todosRouter.patch('/:_id', authenticate, (req, res) => {
  const _id = req.params._id
  const { body } = req
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  if ((typeof(body.completed) === 'boolean') && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }
  TodoModel.findOneAndUpdate({ _id, _creator: req.user._id }, {$set: body}, {new: true} )
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch((err) => res.status(400).send(err))
})

export default todosRouter
