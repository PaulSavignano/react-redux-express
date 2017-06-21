import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import Carousel from '../models/Carousel'
import Section from '../models/Section'

const carousels = express.Router()

const s3Path = `${process.env.APP_NAME}/carousels/carousel_`

// Create
carousels.post('/', authenticate(['admin']), (req, res) => {
  const { sectionId } = req.body
  const newCarousel = new Carousel({
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  newCarousel.save()
    .then(carousel => {
      const update = {
        components: {
          componentId: carousel._id,
          type: 'Carousel'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ carousel, section })
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



// Read
carousels.get('/', (req, res) => {
  Carousel.find({})
    .then(docs => {
      res.send(docs)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

carousels.get('/:_id', (req, res) => {
  const _id = req.params._id
  Carousel.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
carousels.patch('/:_id', authenticate(['admin']), (req, res) => {
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
          Carousel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
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

    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          const update = { image: null }
          Carousel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
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
      Carousel.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
        .then(doc => {
          res.send(doc)
        })
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
carousels.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const Key = `${s3Path}${_id}`
  Carousel.findOne({ _id })
    .then(carousel => {
      carousel.remove()
        .then(carousel => {
          Section.findOneAndUpdate({ _id: carousel.sectionId }, { $pull: { components: { componentId: carousel._id }}}, { new: true })
            .then(section => res.send({ carousel, section }))
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



export default carousels
