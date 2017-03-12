import express from 'express'
import { ObjectID } from 'mongodb'
import TodoModel from './TodoModel'
import { authenticate } from '../../middleware/authenticate'

const todosRouter = express.Router()


// Create
todosRouter.post('/', authenticate(['user']), (req, res) => {
  const todo = new TodoModel({
    text: req.body.text,
    _creator: req.user._id
  })
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})




// Read
todosRouter.get('/', authenticate(['user']), (req, res) => {
  TodoModel.find({ _creator: req.user._id })
    .then(todos => res.send(todos))
    .catch(err => res.status(400).send(err))
})

todosRouter.get('/admin', authenticate(['admin']), (req, res) => {
  TodoModel.find({})
    .then(todos => res.send(todos))
    .catch(err => res.status(400).send(err))
})

todosRouter.get('/:_id', authenticate(['user']), (req, res) => {
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



// Update
todosRouter.patch('/:_id', authenticate(['user']), (req, res) => {
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



// Delete
todosRouter.delete('/:_id', authenticate(['user']), (req, res) => {
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






export default todosRouter
