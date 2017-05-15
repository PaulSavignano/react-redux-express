import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Card from '../models/Card'


const cards = express.Router()

const s3Path = `${process.env.APP_NAME}/cards/card_`

// Create
cards.post('/', (req, res) => {
  const { type, pageId, pageName, image, values } = req.body
  const _id = new ObjectID()
  const card = new Card({
    _id,
    pageId: ObjectID(pageId),
    pageName,
    image,
    values
  })
  switch (type) {
    case 'ADD_ITEM_ADD_IMAGE':
    uploadFile({ Key: `${s3Path}${_id}`, Body: image })
      .then(data => {
        card.image = data.Location
        card.save()
          .then(doc => {
              res.send(doc)
            })
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      })
      break
    case 'ADD_ITEM':
      card.save()
        .then(doc => res.send(doc))
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    default:
      return
  }
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
cards.patch('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, pageId, image, values } = req.body
  switch (type) {

    case 'UPDATE_ITEM_UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location, values }
          Card.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              console.log(doc)
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'UPDATE_ITEM_DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}${_id}` })
        .then(() => {
          const update = { image: null, values }
          Card.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              console.log(doc)
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'UPDATE_ITEM':
      Card.findOneAndUpdate({ _id }, { $set: { values: values }}, { new: true })
        .then(doc => {
          console.log(doc)
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
cards.delete('/:_id', (req, res) => {
  const _id = req.params._id
  console.log(_id)
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Card.findOne({ _id })
    .then(doc => {
      if (doc.image) {
        deleteFile({ Key: `${s3Path}${_id}` })
          .then(() => {
            Card.findOneAndRemove({ _id })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          })
      } else {
        Card.findOneAndRemove({ _id,})
          .then(doc => res.send(doc))
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }
    })
})



export default cards
