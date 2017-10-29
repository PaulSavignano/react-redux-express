import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Product from '../models/Product'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../utils/s3'

export const add = (req, res) => {
  const { pageId, pageSlug, sectionId } = req.body
  const newDoc = new Product({
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    image: null,
    values: {}
  })
  newDoc.save()
  .then(product => {
    Section.findOneAndUpdate(
      { _id: product.section },
      { $push: { items: { kind: 'Product', item: product._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ editItem: product, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  Product.find({})
  .then(products => res.send(products))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  Product.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(product => {
    Page.findOne({ _id: product.page })
    .then(page => res.send({ page, product }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}





export const updateWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/page-${pageSlug}/product-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Product.findOneAndUpdate(
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
    .then(product => {
      Page.findOne({ _id: product.page })
      .then(page => res.send({ page, product }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
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
  .then(deleteData => {
    console.log(deleteData)
    Product.findOneAndUpdate(
      { _id },
      { $set: { 'image.src': null }},
      { new: true }
    )
    .then(product => {
      Page.findOne({ _id: product.page })
      .then(page => res.send({ page, product }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Product.findOneAndRemove({ _id })
  .then(product => {
    Section.findOneAndUpdate(
      { _id: product.section },
      { $pull: { items: { kind: 'Product', item: product._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ page, product }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
