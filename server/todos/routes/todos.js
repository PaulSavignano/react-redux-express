import express from 'express'
import { ObjectID } from 'mongodb'

import Todo from '../models/Todo'
import authenticate from '../../middleware/authenticate'



const todos = express.Router()

// Create
todos.post('/', authenticate(['user']), (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})




// Read
todos.get('/', authenticate(['user']), (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => res.send(todos))
    .catch(err => res.status(400).send(err))
})

todos.get('/admin', authenticate(['admin']), (req, res) => {
  Todo.find({})
    .then(todos => res.send(todos))
    .catch(err => res.status(400).send(err))
})

todos.get('/:_id', authenticate(['user']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Todo.findOne({
    _id,
    _creator: req.user._id
  })
    .then((todo) => {
      if (!todo) return res.status(404).send()
      res.send({ todo })
    })
    .catch((err) => res.status(400).send())
})



// Update
todos.patch('/:_id', authenticate(['user']), (req, res) => {
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
  Todo.findOneAndUpdate({ _id, _creator: req.user._id }, {$set: body}, {new: true} )
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch((err) => res.status(400).send(err))
})



// Delete
todos.delete('/:_id', authenticate(['user']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Todo.findOneAndRemove({
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






export default todos
