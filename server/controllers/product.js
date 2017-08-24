import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Product from '../models/Product'
import { deleteFile, uploadFile } from '../middleware/s3'

export const add = (req, res) => {
  const { pageId, productSectionId } = req.body
  const newDoc = new Product({
    page: ObjectID(pageId),
    productSection: ObjectID(productSectionId),
    image: null,
    values: []
  })
  newDoc.save()
  .then(product => {
    Page.findOne({ _id: pageId })
    .then(page => res.send({ page, editItem: product }))
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
    image,
    pageId,
    pageSlug,
    removeImageSrc,
    productSectionId,
    type,
    values
  } = req.body
  const Key = `${process.env.APP_NAME}/page-${pageSlug}/product-section-${productSectionId}/product-${_id}_${moment(Date.now()).format("YYYY/MM/DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          Product.findOneAndUpdate(
            { _id },
            { $set: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }},
            { new: true }
          )
          .then(() => {
            Page.findOne({ _id: pageId })
            .then(page => res.send({ page }))
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
      break
    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Product.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
            { new: true }
          )
          .then(() => {
            Page.findOne({ _id: pageId })
            .then(page => res.send({ page }))
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
      break
    case 'UPDATE_VALUES':
      Product.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(() => {
        Page.findOne({ _id: pageId })
        .then(page => res.send({ page }))
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
      break
    default:
      return
  }
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Product.remove({ _id })
  .then(product => {
    Page.findOne({ _id: product.page })
    .then(page => res.send({ page }))
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
