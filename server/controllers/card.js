import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Card from '../models/Card'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { pageId, cardSectionId } = req.body
  const newDoc = new Card({
    cardSection: ObjectID(cardSectionId),
    page: ObjectID(pageId),
    image: null,
    values: []
  })
  newDoc.save()
  .then(card => {
    Page.findOne({ _id: pageId })
    .then(page => res.send({ page, editItem: card }))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    image,
    pageId,
    pageSlug,
    removeImageSrc,
    cardSectionId,
    type,
    values
  } = req.body
  const Key = `${process.env.APP_NAME}/page-${pageSlug}/card-section-${cardSectionId}/card-${_id}_${moment(Date.now()).format("YYYY/MM/DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          Card.findOneAndUpdate(
            { _id },
            { $set: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }},
            { new: true }
          )
          .then(() => {
            Page.findOne({ _id: pageId })
            .then(page => res.send({ page }))
            .catch(error => {
              console.error(error)
              res.status(400).send({ error })
            })
          })
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break
    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Card.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
            { new: true }
          )
          .then(() => {
            Page.findOne({ _id: pageId })
            .then(page => res.send({ page }))
            .catch(error => {
              console.error(error)
              res.status(400).send({ error })
            })
          })
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break
    case 'UPDATE_VALUES':
      Card.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(() => {
        Page.findOne({ _id: pageId })
        .then(page => res.send({ page }))
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
      break
    default:
      return
  }
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Card.remove({ _id })
  .then(card => {
    Page.findOne({ _id: card.page })
    .then(page => res.send({ page }))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}
