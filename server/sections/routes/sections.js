import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Section from '../models/Section'


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
  switch (type) {

    case 'UPDATE_ITEM_UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location, values }
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

    case 'UPDATE_ITEM_DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}${_id}` })
        .then(() => {
          const update = { image: null, values }
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

    case 'UPDATE_ITEM':
      Section.findOneAndUpdate({ _id }, { $set: { values: values }}, { new: true })
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
    .then(doc => {
      if (doc.image) {
        deleteFile({ Key: `${s3Path}${_id}` })
          .then(() => {
            Section.findOneAndRemove({ _id })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          })
      } else {
        Section.findOneAndRemove({ _id,})
          .then(doc => res.send(doc))
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }
    })
})



export default sections
