import express from 'express'
import { ObjectID } from 'mongodb'
import moment from 'moment'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import Page from '../models/Page'
import Slide from '../models/Slide'
import Section from '../models/Section'

const slides = express.Router()

const s3Path = `${process.env.APP_NAME}/slides/slide_`

// Create
slides.post('/', authenticate(['admin']), (req, res) => {
  const newSlide = new Slide({
    image: null,
    values: []
  })
  newSlide.save()
    .then(slide => res.send(slide))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})


// Read
slides.get('/', (req, res) => {
  Slide.find({})
    .then(docs => {
      res.send(docs)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

slides.get('/:_id', (req, res) => {
  const _id = req.params._id
  Slide.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
slides.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, sectionId, image, oldImage, values } = req.body
  const Key = `${s3Path}${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImage)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            values
          }
          Slide.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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
      deleteFile({ Key: image.src })
        .then(() => {
          const update = { image: null }
          Slide.findOneAndUpdate({ _id }, { $set: { 'image.src': null }}, { new: true })
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
      Slide.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
slides.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const Key = `${s3Path}${_id}`
  Slide.findOne({ _id })
    .then(slide => res.send(slide))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



export default slides
