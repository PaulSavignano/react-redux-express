import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Card from '../models/Card'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../utils/s3'

export const add = (req, res) => {
  const {
    body: {
      pageId,
      pageSlug,
      sectionId
    },
    hostname
  } = req
  const newDoc = new Card({
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
      { $push: { items: { kind: 'Card', item: doc._id }}},
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
    params: { _id }
  } = req
  Card.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page, hostname })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}






export const updateWithImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      pageSlug,
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const Key = `${hostname}/page-${pageSlug}/card-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Card.findOneAndUpdate(
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
      .catch(error => { console.error(error); res.status(400).send({ error })})
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
      values
    },
    hostname,
    params: { _id },
  } = req
  return deleteFile({ Key: oldImageSrc })
    .then(deleteData => {
      console.log(deleteData)
      Card.findOneAndUpdate(
        { _id, hostname },
        { $set: {
          'image.src': null,
          values,
        }},
        { new: true }
      )
      .then(doc => {
        Page.findOne({ _id: doc.page, hostname })
        .then(page => res.send({ page }))
        .catch(error => { console.error(error); res.status(400).send({ error })})
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
  Card.findOneAndRemove({ _id, hostname })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section, hostname },
      { $pull: { items: { kind: 'Card', item: doc._id }}},
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
