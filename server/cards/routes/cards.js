import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Card from '../models/Card'
import Section from '../../sections/models/Section'

const cards = express.Router()

const s3Path = `${process.env.APP_NAME}/cards/card_`

// Create
cards.post('/', authenticate(['admin']), (req, res) => {
  const { sectionId } = req.body
  const newCard = new Card({
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  newCard.save()
    .then(card => {
      Section.findOneAndUpdate({ _id: sectionId }, { $push: { components: { cardId: card._id }}, $set: { componentType: 'Card' }}, { new: true })
        .then(section => {
          res.send({ card, section })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error })
    })
})



// Read
cards.get('/', (req, res) => {
  Card.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(400).send(err))
})

cards.get('/:_id', (req, res) => {
  const _id = req.params._id
  Card.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
cards.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  const Key = `${s3Path}${_id}`
  console.log(type, _id)
  switch (type) {

    case 'UPDATE_IMAGE':
      uploadFile({ Key }, image)
        .then(data => {
          const update = { image: data.Location, values }
          Card.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
        .catch(err => console.log(err))
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          const update = { image: null, values }
          Card.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'UPDATE_VALUES':
      Card.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
        .then(doc => {
          res.send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
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
  Card.findOneAndRemove({ _id })
    .then(card => {
      Section.findOneAndUpdate({ _id: card.sectionId }, { $pull: { components: { cardId: card._id }}}, { new: true })
        .then(section => {
          res.send({ card, section })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error })
    })
})




export default cards
