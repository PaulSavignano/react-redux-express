import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import Image from '../models/Image'
import Section from '../models/Section'

const images = express.Router()

const s3Path = `${process.env.APP_NAME}/images/card_`

// Create
images.post('/', authenticate(['admin']), (req, res) => {
  const { pageId, sectionId, pageSlug } = req.body
  const newImage = new Image({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    pageSlug,
    image: null,
    values: []
  })
  newImage.save()
    .then(image => {
      const update = {
        components: {
          componentId: image._id,
          type: 'Image'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ image, section })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(error)
      res.status(400).send()
    })
})



// Read
images.get('/', (req, res) => {
  Image.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

images.get('/:_id', (req, res) => {
  const _id = req.params._id
  Image.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
images.patch('/:_id', authenticate(['admin']), (req, res) => {
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
          Image.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => res.send(doc))
            .catch(err => {
              console.error(err)
              res.status(400).send()
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
      break


    case 'DELETE_IMAGE_UPDATE_VALUES':
      deleteFile({ Key })
        .then(() => {
          Image.findOneAndUpdate({ _id }, { $set: { 'image.src': null, values } }, { new: true })
            .then(doc => res.send(doc))
            .catch(err => {
              console.error(err)
              res.status(400).send()
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
      break




    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          Image.findOneAndUpdate({ _id }, { $set: { 'image.src': null }}, { new: true })
            .then(doc => res.send(doc))
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
      Image.findOneAndUpdate({ _id }, { $set: { values }}, { new: true })
        .then(doc => res.send(doc))
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
images.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Image.findOne({ _id })
    .then(image => {
      image.remove()
        .then(image => {
          Section.findOneAndUpdate({ _id: image.sectionId }, { $pull: { components: { componentId: image._id }}}, { new: true })
            .then(section => res.send({ image, section }))
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




export default images
