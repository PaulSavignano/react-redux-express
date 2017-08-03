import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import Text from '../models/Text'
import Section from '../models/Section'

const texts = express.Router()

// Create
texts.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId, pageSlug } = req.body
  const newText = new Text({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    pageSlug,
    values: []
  })
  newText.save()
    .then(text => {
      const update = {
        components: {
          componentId: text._id,
          type: 'Text'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ text, section })
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
texts.get('/', (req, res) => {
  Text.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

texts.get('/:_id', (req, res) => {
  const _id = req.params._id
  Text.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
texts.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  switch (type) {

    case 'UPDATE_VALUES':
      Text.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
texts.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Text.findOne({ _id })
    .then(text => {
      text.remove()
        .then(text => {
          Section.findOneAndUpdate({ _id: text.sectionId }, { $pull: { components: { componentId: text._id }}}, { new: true })
            .then(section => res.send({ text, section }))
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




export default texts
