import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import Iframe from '../models/Iframe'
import Section from '../models/Section'

const iframes = express.Router()

// Create
iframes.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId, slug } = req.body
  const newIframe = new Iframe({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    values: []
  })
  newIframe.save()
    .then(iframe => {
      const update = {
        components: {
          componentId: iframe._id,
          type: 'Iframe'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ iframe, section })
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
iframes.get('/', (req, res) => {
  Iframe.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

iframes.get('/:_id', (req, res) => {
  const _id = req.params._id
  Iframe.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
iframes.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  switch (type) {

    case 'UPDATE_VALUES':
      Iframe.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
iframes.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Iframe.findOne({ _id })
    .then(iframe => {
      iframe.remove()
        .then(iframe => {
          Section.findOneAndUpdate({ _id: iframe.sectionId }, { $pull: { components: { componentId: iframe._id }}}, { new: true })
            .then(section => res.send({ iframe, section }))
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




export default iframes
