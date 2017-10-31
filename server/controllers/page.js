import { ObjectID } from 'mongodb'
import url from 'url'
import moment from 'moment'

import { deleteFile, uploadFile } from '../utils/s3'
import Page from '../models/Page'
import slugIt from '../utils/slugIt'


export const add = (req, res) => {
  const {
    body: {
      values: { name }
    },
    hostname,
  } = req
  console.log(req.body)
  Page.findOne({ 'values.name': name, hostname })
  .then(page => {
    if (!page) {
      const newPage = new Page({
        hostname,
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
  const { hostname } = req
  Page.find({ hostname })
  .then(pages => res.send(pages))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const update = async (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  try {
    const existingPage = await Page.findOne({ _id, hostname })
    if (existingPage.values.name !== values.name) {
      const nameAlreadyExists = await Page.findOne({ 'values.name': values.name, hostname })
      if (nameAlreadyExists) throw 'That page name already exists'
    }
    const slug = slugIt(values.name)
    const page = await Page.findOneAndUpdate(
      { _id, hostname },
      { $set: { slug, values }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    res.send(page)
  } catch (error) {
    console.error(error)
    res.status(400).send({ error })
  }
}


export const updateWithBackgroundImage = async (req, res) => {
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
  try {
    const existingPage = await Page.findOne({ _id, hostname })
    if (existingPage.values.name !== values.name) {
      const nameAlreadyExists = await Page.findOne({ 'values.name': values.name, hostname })
      if (nameAlreadyExists) throw 'That page name already exists'
    }
    const slug = slugIt(values.name)
    const Key = `${hostname}/page-${pageSlug}-background-image-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
    const data = await uploadFile({ Key }, newBackgroundImage.src, oldBackgroundImageSrc)
    const page = await Page.findOneAndUpdate(
      { _id, hostname },
      { $set: {
        backgroundImage: {
          src: data.Location,
          width: newBackgroundImage.width,
          height: newBackgroundImage.height
        },
        slug,
        values
      }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    res.send(page)
  } catch (error) {
    console.error(error)
    res.status(400).send({ error })
  }
}



export const updateWithDeleteBackgroundImage = async (req, res) => {
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
  try {
    const existingPage = await Page.findOne({ _id, hostname })
    if (existingPage.values.name !== values.name) {
      const nameAlreadyExists = await Page.findOne({ 'values.name': values.name, hostname })
      if (nameAlreadyExists) throw 'That page name already exists'
    }
    const slug = slugIt(values.name)
    const deleteData = await deleteFile({ Key: oldBackgroundImageSrc })
    console.log(deleteData)
    const page = await Page.findOneAndUpdate(
      { _id, hostname },
      { $set: {
        'backgroundImage.src': null,
        slug,
        values
      }},
      { new: true }
    )
    .populate({
      path: 'sections',
      populate: { path: 'items.item' }
    })
    res.send(page)
  } catch (error) {
    console.error(error)
    res.status(400).send({ error })
  }
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Page.findOneAndRemove({ _id, hostname })
  .then(page => res.send(page))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
