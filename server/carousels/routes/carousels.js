import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Carousel from '../models/Carousel'


const carousels = express.Router()

const s3Path = `${process.env.APP_NAME}/carousels`

// Create
carousels.post('/', authenticate(['admin']), (req, res) => {
  const { type, sectionId, image, values } = req.body
  const _id = new ObjectID()
  const card = new Carousel({
    _id,
    sectionId: ObjectID(sectionId),
    image,
    values
  })
  switch (type) {
    case 'ADD_ITEM_ADD_IMAGE':
    uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
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
carousels.get('/', (req, res) => {
  Carousel.find({})
    .then(docs => {
      res.send(docs)
    })
    .catch(err => res.status(400).send(err))
})

carousels.get('/:_id', (req, res) => {
  const _id = req.params._id
  Carousel.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
carousels.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, values } = req.body
  switch (type) {

    case 'UPDATE_ITEM_UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location, values }
          Carousel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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

    case 'UPDATE_ITEM_DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null, values }
          Carousel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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

    case 'UPDATE_ITEM':
      Carousel.findOneAndUpdate({ _id }, { $set: { values: values }}, { new: true })
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
carousels.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Carousel.findOne({ _id })
    .then(doc => {
      if (doc.image) {
        deleteFile({ Key: `${s3Path}/${_id}` })
          .then(() => {
            Carousel.findOneAndRemove({ _id })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          })
      } else {
        Carousel.findOneAndRemove({ _id,})
          .then(doc => res.send(doc))
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }
    })
})



export default carousels
