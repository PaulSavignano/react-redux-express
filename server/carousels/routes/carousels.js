import express from 'express'
import { ObjectID } from 'mongodb'

import { authenticate } from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Carousel from '../models/Carousel'


const carousels = express.Router()



// Create
carousels.post('/', (req, res) => {
  const { pageId, pageName } = req.body
  const carousel = new Carousel({
    pageId: ObjectID(pageId),
    pageName,
  })
  carousel.save()
    .then(doc => {
        res.send(doc)
      })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Read
carousels.get('/', (req, res) => {
  Carousel.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(400).send(err))
})

// By page name
carousels.get('/:_id', (req, res) => {
  const _id = req.params._id
  Carousel.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
carousels.patch('/:carouselId', (req, res) => {
  const carouselId = req.params.carouselId
  if (!ObjectID.isValid(carouselId)) return res.status(404).send()
  const { type, pageId, update } = req.body
  const itemId = update.itemId ? ObjectID(update.itemId) : new ObjectID()

  switch (type) {

    case 'ADD_ITEM':
      if (image) {
        uploadFile({ Key: `carousels/item_${itemId}`, Body: image })
          .then(data => {
            update.image = data.Location
            Carousel.findOneAndUpdate({ _id: carouselId }, { $push: { items: update }}, { new: true })
              .then(doc => {
                console.log('doc', doc)
                res.send(doc)
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
            .catch(err => res.status(400).send(err))
          })
      } else {
        Carousel.findOneAndUpdate({ _id: carouselId }, { $push: { items: update }}, { new: true })
          .then(doc => {
            console.log('doc', doc)
            res.send(doc)
          })
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }

      break

    case 'UPDATE_ITEM':
      if (image) {
        uploadFile({ Key: `carousels/item_${itemId}`, Body: image })
          .then(data => {
            update.image = data.Location
            Carousel.findOneAndUpdate({ _id: carouselId, 'items._id': itemId }, { $set: { 'items.$': update }}, { new: true })
              .then(doc => res.send(doc))
              .catch(err => res.status(400).send(err))
          })
          .catch(err => res.status(400).send(err))
      } else {
        Carousel.findOneAndUpdate({ _id: carouselId, 'items._id': itemId }, { $set: { 'items.$.values': update.values } }, { new: true })
          .then(doc => res.send(doc))
          .catch(err => res.status(400).send(err))
      }
      break

    case 'DELETE_ITEM':
      if (image) {
        deleteFile({ Key: `carousels/item_${itemId}` })
          .then(data => {
            Carousel.findOneAndUpdate({ _id: carouselId, 'items._id': itemId }, { $pull: { 'items.$._id': itemId }}, { new: true })
              .then(doc => res.send(doc))
              .catch(err => res.status(400).send(err))
            })
          .catch(err => res.status(400).send(err))
      } else {
        Carousel.findOneAndUpdate({ _id: carouselId, 'items._id': itemId }, { $pull: { 'items.$._id': itemId }}, { new: true })
          .then(doc => res.send(doc))
          .catch(err => res.status(400).send(err))
      }
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: `carousels/item_${itemId}` })
        .then(data => {
          Carousel.findOneAndUpdate({ _id: carouselId, 'items._id': itemId }, { $set: { 'items.$.image': null }}, { new: true })
            .then(doc => res.send(doc))
            .catch(err => res.status(400).send(err))
          })
        .catch(err => res.status(400).send(err))
      break

    default:
      return
  }
})



// Delete
carousels.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Carousel.findOneAndRemove({ _id,})
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})



export default carousels
