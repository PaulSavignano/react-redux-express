import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import Card from '../models/Card'
import Section from '../models/Section'

const cards = express.Router()

const s3Path = `${process.env.APP_NAME}/cards/card_`

// Create
cards.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId, slug } = req.body
  const newCard = new Card({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    slug,
    image: null,
    values: []
  })
  newCard.save()
    .then(card => {
      const update = {
        components: {
          componentId: card._id,
          type: 'Card'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ card, section })
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
cards.get('/', (req, res) => {
  Card.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

cards.get('/:_id', (req, res) => {
  const _id = req.params._id
  Card.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
cards.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  const Key = `${s3Path}${_id}`
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            values
          }
          Card.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => res.send(doc))
            .catch(err => {
              console.error(err)
              res.status(400).send()
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
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          Card.findOneAndUpdate({ _id }, { $set: { 'image.src': null }}, { new: true })
            .then(doc => res.send(doc))
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'UPDATE_VALUES':
      Card.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
cards.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Card.findOne({ _id })
    .then(card => {
      card.remove()
        .then(card => {
          Section.findOneAndUpdate({ _id: card.sectionId }, { $pull: { components: { componentId: card._id }}}, { new: true })
            .then(section => res.send({ card, section }))
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




export default cards
