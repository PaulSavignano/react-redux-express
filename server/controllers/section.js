import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile, deleteFiles } from '../middleware/s3'


export const add = (req, res) => {
  const { pageId, pageSlug } = req.body
  const newSection = new Section({
    pageId: ObjectID(pageId),
    pageSlug
  })
  newSection.save()
    .then(section => {
      Page.findOne({ _id: pageId })
      .then(page => res.send({ editItem: section, page }))
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
  const { _id } = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    pageId,
    pageSlug,
    image,
    removeImageSrc,
    values
  } = req.body
  const Key = `${process.env.APP_NAME}/page-${pageSlug}/section-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
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
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
      .then(() => {
        Section.findOneAndUpdate(
          { _id },
          { $set: { 'appBar.image.src': null }},
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
      break

    case 'UPDATE_VALUES':
      Section.findOneAndUpdate(
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
  const { pageId, sectionId} = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Section.remove({ _id: sectionId })
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
}
