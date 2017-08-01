import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import Title from '../models/Title'
import Section from '../models/Section'

const titles = express.Router()

// Create
titles.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId } = req.body
  const newTitle = new Title({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    values: []
  })
  newTitle.save()
    .then(title => {
      const update = {
        components: {
          componentId: title._id,
          type: 'Title'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ title, section })
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
titles.get('/', (req, res) => {
  Title.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

titles.get('/:_id', (req, res) => {
  const _id = req.params._id
  Title.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
titles.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  switch (type) {

    case 'UPDATE_VALUES':
      Title.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
titles.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Title.findOne({ _id })
    .then(title => {
      title.remove()
        .then(title => {
          Section.findOneAndUpdate({ _id: title.sectionId }, { $pull: { components: { componentId: title._id }}}, { new: true })
            .then(section => res.send({ title, section }))
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




export default titles
