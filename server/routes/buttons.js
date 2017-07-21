import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import Button from '../models/Button'
import Section from '../models/Section'

const buttons = express.Router()

// Create
buttons.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId, slug } = req.body
  const newButton = new Button({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    slug
  })
  newButton.save()
    .then(button => {
      const update = {
        components: {
          componentId: button._id,
          type: 'Button'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ button, section })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(error)
      res.status(400).send()
    })
})



// Read
buttons.get('/', (req, res) => {
  Button.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

buttons.get('/:_id', (req, res) => {
  const _id = req.params._id
  Button.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
buttons.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, values } = req.body
  switch (type) {
    case 'UPDATE_VALUES':
      Button.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
        .then(doc => res.send(doc))
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      break
    default:
      return
  }
})



// Delete
buttons.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Button.findOne({ _id })
    .then(button => {
      button.remove()
        .then(button => {
          Section.findOneAndUpdate({ _id: button.sectionId }, { $pull: { components: { componentId: button._id }}}, { new: true })
            .then(section => res.send({ button, section }))
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})




export default buttons
