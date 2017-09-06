import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { pageId, pageSlug } = req.body
  const newDoc = new Section({
    page: ObjectID(pageId),
    pageSlug
  })
  newDoc.save()
  .then(doc => {
    Page.findOneAndUpdate(
      { _id: doc.page },
      { $push: { sections: doc._id }},
      { new: true }
    )
    .then(() => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ editItem: doc, page }))
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
    res.status(400).send()
  })
}

export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    image,
    oldImageSrc,
    pageSlug,
    type,
    values
  } = req.body
  const Key = `${process.env.APP_NAME}/page-${pageSlug}/section-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      return uploadFile({ Key }, image.src, oldImageSrc)
      .then(data => {
        Section.findOneAndUpdate(
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
        .then(doc => {
          Page.findOne({ _id: doc.page })
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
    case 'DELETE_IMAGE':
      return deleteFile({ Key: image.src })
      .then(() => {
        Section.findOneAndUpdate(
          { _id },
          { $set: { 'image.src': null }},
          { new: true }
        )
        .then(doc => {
          Page.findOne({ _id: doc.page })
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
    case 'UPDATE_VALUES':
      return Section.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(doc => {
        Page.findOne({ _id: doc.page })
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
    default:
      return
  }
}

export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Section.findOneAndRemove({ _id })
  .then(doc => {
    Page.findOneAndUpdate(
      { _id: doc.page },
      { $pull: { sections: doc._id }},
      { new: true }
    )
    .then(page => {
      Page.findOne({ _id: page._id })
      .then(page => {
        res.send({ page })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send()
  })
}
