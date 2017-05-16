import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import Hero from '../models/Hero'


const heros = express.Router()

const s3Path = `${process.env.APP_NAME}/heros`

// Create
heros.post('/', authenticate(['admin']), (req, res) => {
  const { type, pageId, pageName } = req.body
  const _id = new ObjectID()
  const card = new Hero({
    _id,
    pageId: ObjectID(pageId),
    pageName
  })
  card.save()
    .then(doc => res.send(doc))
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Read
heros.get('/', (req, res) => {
  Hero.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(400).send(err))
})

heros.get('/:_id', (req, res) => {
  const _id = req.params._id
  Hero.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Update
heros.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, pageId, image, values } = req.body
  switch (type) {

    case 'UPDATE_ITEM_UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}/${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location, values }
          Hero.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null, values }
          Hero.findOneAndUpdate({ _id }, { $set: update }, { new: true })
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
      Hero.findOneAndUpdate({ _id }, { $set: { values: values }}, { new: true })
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
heros.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  console.log(_id)
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Hero.findOne({ _id })
    .then(doc => {
      if (doc.image) {
        deleteFile({ Key: `${s3Path}/${_id}` })
          .then(() => {
            Hero.findOneAndRemove({ _id })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          })
      } else {
        Hero.findOneAndRemove({ _id,})
          .then(doc => res.send(doc))
          .catch(err => {
            console.log(err)
            res.status(400).send(err)
          })
      }
    })
})



export default heros
