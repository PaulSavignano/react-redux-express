import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile, deleteFiles } from '../../middleware/s3'
import Section from '../models/Section'
import Card from '../../cards/models/Card'
import Carousel from '../../carousels/models/Carousel'
import Product from '../../products/models/Product'

const sections = express.Router()

const s3Path = `${process.env.APP_NAME}/sections/section_`

// Create
sections.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, pageName } = req.body
  const section = new Section({
    pageId: ObjectID(pageId),
    pageName,
    values: []
  })
  section.save()
    .then(doc => {
        res.send(doc)
      })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Read
sections.get('/', (req, res) => {
  Section.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(400).send(err))
})

sections.get('/:_id', (req, res) => {
  const _id = req.params._id
  Section.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
sections.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, pageId, image, values } = req.body
  const Key = `${s3Path}${_id}`
  switch (type) {

    case 'UPDATE_IMAGE':
      uploadFile({ Key }, image)
        .then(data => {
          const update = { image: data.Location }
          Section.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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
      deleteFile({ Key })
        .then(() => {
          const update = { image: null }
          Section.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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
      Section.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
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
sections.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Section.findOne({ _id })
    .then(section => {
      section.remove()
        .then(section => {
          res.send(section)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
})



export default sections
