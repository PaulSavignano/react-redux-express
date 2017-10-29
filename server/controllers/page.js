import { ObjectID } from 'mongodb'
import url from 'url'
import moment from 'moment'

import { deleteFile, uploadFile } from '../utils/s3'
import Page from '../models/Page'
import slugIt from '../utils/slugIt'


export const add = (req, res) => {
  const { name } = req.body
  Page.findOne({ name })
  .then(page => {
    if (!page) {
      const newPage = new Page({
        slug: slugIt(name),
        values: { name }
      })
      newPage.save()
      .then(page => res.send(page))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    } else {
      return res.status(400).send({ error: 'That name already exists' })
    }
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  Page.find({})
  .then(pages => res.send(pages))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  const slug = slugIt(values.name)
  Page.findOneAndUpdate(
    { _id },
    { $set: { slug, values }},
    { new: true }
  )
  .populate({
    path: 'sections',
    populate: { path: 'items.item' }
  })
  .then(page => res.send(page))
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
  const Key = `${rootUrl}/page-${pageSlug}-background-image-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    Page.findOneAndUpdate(
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
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    .then(page => res.send(page))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const updateWithDeleteBackgroundImage = (req, res) => {
  console.log('inside page background Image delete')
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
    Page.findOneAndUpdate(
      { _id },
      { $set: { 'backgroundImage.src': null }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    .then(page => res.send(page))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Page.findOneAndRemove({ _id })
  .then(page => res.send(page))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
