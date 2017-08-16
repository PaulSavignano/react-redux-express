import { ObjectID } from 'mongodb'
import moment from 'moment'

import Article from '../models/Article'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { sectionId } = req.body
  const newDoc = new Article({
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  newDoc.save()
    .then(article => {
      Section.findOneAndUpdate(
        { _id: sectionId },
        { $push: { components: { componentId: article._id, type: 'Article' }}},
        { new: true }
      )
      .then(section => res.send({ article, section }))
      .catch(err => {
        console.error(err)
        res.status(400).send({ error: err })
      })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ error: err })
    })
}



export const get = (req, res) => {
  Article.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send({ error: err })
    })
}



export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const { type, sectionId, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/articles/article-${_id}_${moment(Date.now()).format("YYYY/MM/DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            values
          }
          Article.findOneAndUpdate(
            { _id },
            { $set: update },
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(err => {
            console.error(err)
            res.status(400).send({ error: err })
          })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send({ error: err })
        })
      break
    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Article.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(err => {
            console.error(err)
            res.status(400).send({ error: err })
          })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send({ error: err })
        })
      break
    case 'UPDATE_VALUES':
      Article.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(err => {
        console.error(err)
        res.status(400).send({ error: err })
      })
      break
    default:
      return
  }
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Article.remove(
    { _id }
  )
  .then(update => res.send(update))
  .catch(err => {
    console.error(err)
    res.status(400).send()
  })
}
