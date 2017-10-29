import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../utils/s3'

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


export const updateWithBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    newBackgroundImage,
    oldBackgroundImageSrc,
    pageSlug,
    values
  } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/page-${pageSlug}/section-${_id}-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    Section.findOneAndUpdate(
      { _id },
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
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const updateWithDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    oldBackgroundImageSrc,
    pageSlug,
    type,
    values
  } = req.body
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    Section.findOneAndUpdate(
      { _id },
      { $set: { 'backgroundImage.src': null }},
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
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
