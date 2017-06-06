import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Carousel from '../models/Carousel'


const carousels = express.Router()

const s3Path = `${process.env.APP_NAME}/carousels`

// Create
carousels.post('/', authenticate(['admin']), (req, res) => {
  const { sectionId } = req.body
  const carousel = new Carousel({
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  carousel.save()
    .then(doc => {
        res.send(doc)
      })
    .catch(err => {
      res.status(400).send(err)
    })
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

    case 'UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location }
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

    case 'DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null }
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

    case 'UPDATE_VALUES':
      Carousel.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
