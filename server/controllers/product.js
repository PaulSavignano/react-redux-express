import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Product from '../models/Product'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../utils/s3'

export const add = (req, res) => {
  const {
    body: { pageId, pageSlug, sectionId },
    hostname
  } = req
  const newDoc = new Product({
    hostname,
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    values: {}
  })
  newDoc.save()
  .then(product => {
    Section.findOneAndUpdate(
      { _id: product.section, hostname },
      { $push: { items: { kind: 'Product', item: product._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ editItem: product, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  const { hostname } = req
  Product.find({ hostname })
  .then(products => res.send(products))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  Product.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(product => {
    Page.findOne({ _id: product.page, hostname })
    .then(page => res.send({ page, product }))
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
  const Key = `${hostname}/page-${pageSlug}/product-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Product.findOneAndUpdate(
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
    .then(product => {
      Page.findOne({ _id: product.page, hostname })
      .then(page => res.send({ page, product }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const updateWithDeleteImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { oldImageSrc, type, values },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    Product.findOneAndUpdate(
      { _id, hostname },
      { $set: { 'image.src': null }},
      { new: true }
    )
    .then(product => {
      Page.findOne({ _id: product.page, hostname })
      .then(page => res.send({ page, product }))
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
  Product.findOneAndRemove({ _id, hostname })
  .then(product => {
    Section.findOneAndUpdate(
      { _id: product.section, hostname },
      { $pull: { items: { kind: 'Product', item: product._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ page, product }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
