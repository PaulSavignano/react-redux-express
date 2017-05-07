import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Card from '../models/Card'
import Page from '../../pages/models/Page'
import { authenticate } from '../../middleware/authenticate'
import { uploadFile } from '../../middleware/s3'

const cards = express.Router()



// Create
cards.post('/', (req, res) => {
  const { pageId, pageName } = req.body
  console.log(req.body)
  const card = new Card({
    pageId: ObjectID(pageId),
    pageName,
  })
  card.save()
    .then(card => {
      Page.findOneAndUpdate({ _id: pageId }, { $push: { components: card._id }}, { new: true })
        .then(page => {
          res.send(card)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })

    })
    .catch(err => res.state(400).send(err))
})



// Read
cards.get('/', (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(400).send(err))
})

// By page name
cards.get('/:_id', (req, res) => {
  const _id = req.params._id
  Card.find({ _id })
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})





// Update
cards.patch('/:cardId', (req, res) => {
  const cardId = req.params.cardId
  if (!ObjectID.isValid(cardId)) return res.status(404).send()
  const { type, pageId, update } = req.body
  const { image } = update
  const itemId = update.itemId ? ObjectID(update.itemId) : new ObjectID()

  switch (type) {

    case 'UPDATE_WIDTH':
      Card.findOneAndUpdate({ _id: cardId }, { $set: { width: update.width }}, { new: true })
        .then(doc => {
          if (!doc) return res.status(404).send()
          res.send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      break

    case 'UPDATE_IMAGE':
      uploadFile({ Key: `cards/images/${cardId}`, Body: image })
        .then(data => {
          Card.findOneAndUpdate({ _id: cardId }, { $set: { image: data.Location }}, { new: true })
            .then(doc => res.send(doc))
            .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
      break

    case 'ADD_CAROUSEL':
      console.log(cardId)
      Card.findOneAndUpdate({ _id: cardId }, { $push: { carousel: { _id: itemId } }}, { new: true })
        .then(doc => {
          console.log('doc', doc)
          res.send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      break

    case 'UPDATE_CAROUSEL_IMAGE':
      uploadFile({ Key: `cards/carousel/images/${itemId}`, Body: image })
        .then(data =>
          Card.findOneAndUpdate({ _id: cardId, 'carousel._id': itemId }, { $set: { 'carousel.$.image': data.Location } }, { new: true }))
            .then(doc => res.send(doc))
            .catch(err => res.status(400).send(err))
        .catch(err => res.status(400).send(err))
      break

    default:
      return
  }
})





// Delete
cards.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Card.findOneAndRemove({ _id,})
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})




export default cards
