import { ObjectID } from 'mongodb'
import moment from 'moment'

import Article from '../models/Article'
import Section from '../models/Section'
import Page from '../models/Page'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { pageId, pageSlug, sectionId } = req.body
  const newDoc = new Article({
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $push: { items: { kind: 'Article', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
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
    res.status(400).send({ error })
  })
}


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  Article.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error: error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error: error })})
}


export const updateWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    pageSlug,
    newImage,
    oldImageSrc,
    values
  } = req.body
  const appUrl = req.get('host')
  const Key = `${appUrl}/page-${pageSlug}/article-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Article.findOneAndUpdate(
      { _id },
      { $set: {
        image: {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        values
      }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    type,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(() => {
    Article.findOneAndUpdate(
      { _id },
      { $set: { 'image.src': null }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Article.findOneAndRemove({ _id })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $pull: { items: { kind: 'Article', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ page }))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}
