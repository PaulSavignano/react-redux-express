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
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}





export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    values
  } = req.body
  return Section.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    newImage,
    oldImageSrc,
    pageSlug,
    values
  } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/page-${pageSlug}/section-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Section.findOneAndUpdate(
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
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const updateWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    oldImageSrc,
    pageSlug,
    type,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(() => {
    Section.findOneAndUpdate(
      { _id },
      { $set: { 'image.src': null }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
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
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
