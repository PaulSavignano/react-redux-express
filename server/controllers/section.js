import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../utils/s3'

export const add = (req, res) => {
  const {
    body: { pageId, pageSlug },
    hostname
  } = req
  const newDoc = new Section({
    hostname,
    page: ObjectID(pageId),
    pageSlug
  })
  newDoc.save()
  .then(doc => {
    Page.findOneAndUpdate(
      { _id: doc.page, hostname },
      { $push: { sections: doc._id }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    .then(page => res.send({ editItem: doc, page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}





export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  return Section.findOneAndUpdate(
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


export const updateWithBackgroundImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: {
      newBackgroundImage,
      oldBackgroundImageSrc,
      pageSlug,
      values
    },
    hostname,
    params: { _id }
  } = req
  const Key = `${hostname}/page-${pageSlug}/section-${_id}-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    Section.findOneAndUpdate(
      { _id, hostname },
      { $set: {
        backgroundImage: {
          src: data.Location,
          width: newBackgroundImage.width,
          height: newBackgroundImage.height
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
}



export const updateWithDeleteBackgroundImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: {
      oldBackgroundImageSrc,
      pageSlug,
      type,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    Section.findOneAndUpdate(
      { _id, hostname },
      { $set: { 'backgroundImage.src': null }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page, hostname })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Section.findOneAndRemove({ _id, hostname })
  .then(doc => {
    Page.findOneAndUpdate(
      { _id: doc.page, hostname },
      { $pull: { sections: doc._id }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
