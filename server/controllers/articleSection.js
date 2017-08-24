import { ObjectID } from 'mongodb'
import moment from 'moment'

import ArticleSection from '../models/ArticleSection'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { pageId } = req.body
  const newDoc = new ArticleSection({
    pageId: ObjectID(pageId),
    image: null,
    values: []
  })
  newDoc.save()
    .then(articleSection => {
      Page.findOne({ _id: pageId })
      .then(page => res.send({ editItem: articleSection, page }))
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
    pageId,
    image,
    removeImageSrc,
    type,
    values
  } = req.body
  const Key = `${process.env.APP_NAME}/page-${pageSlug}/article-section-${_id}_${moment(Date.now()).format("YYYY/MM/DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          ArticleSection.findOneAndUpdate(
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
          ArticleSection.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
            { new: true }
          )
          .then(() => {
            Page.findOne({ _id: pageId })
            .then(page => res.send({ page }))
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
      ArticleSection.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(() => {
        Page.findOne({ _id: pageId })
        .then(page => res.send({ page }))
        .catch(error => {
          console.error(error)
          res.status(400).send({ error: error })
        })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error: error })
      })
      break
    default:
      return
  }
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  ArticleSection.findOne({ _id })
  .then(articleSection => {
    Page.findOne({ _id: articleSection.page })
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
