import { ObjectID } from 'mongodb'
import moment from 'moment'

import Article from '../models/Article'
import Section from '../models/Section'
import Page from '../models/Page'
import { deleteFile, uploadFile } from '../utils/s3'

export const add = (req, res) => {
  const {
    hostname,
    body: {
      pageId,
      pageSlug,
      sectionId
    }
  } = req
  const newDoc = new Article({
    hostname,
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section, hostname },
      { $push: { items: { kind: 'Article', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ editItem: doc, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id },
  } = req
  Article.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page, hostname })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error: error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error: error })})
}


export const updateWithImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      pageSlug,
      newImage,
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const Key = `${hostname}/page-${pageSlug}/article-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Article.findOneAndUpdate(
      { _id, hostname },
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
      Page.findOne({ _id: doc.page, hostname })
      .then(page => res.send({ page }))
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateWithDeleteImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldImageSrc,
      type,
      values
    },
    hostname,
    params: { _id },
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    Article.findOneAndUpdate(
      { _id, hostname },
      { $set: { 'image.src': null }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page, hostname })
      .then(page => res.send({ page }))
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Article.findOneAndRemove({ _id, hostname })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section, hostname },
      { $pull: { items: { kind: 'Article', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
