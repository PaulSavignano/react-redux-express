import { ObjectID } from 'mongodb'
import moment from 'moment'

import { uploadFile, deleteFile } from '../middleware/s3'
import slugIt from '../middleware/slugIt'
import Product from '../models/Product'
import Section from '../models/Section'


export const add = (req, res) => {
  const { pageId, sectionId, pageSlug } = req.body
  const newProduct = new Product({
    sectionId: ObjectID(sectionId),
    pageSlug,
    image: null,
    values: []
  })
  newProduct.save()
    .then(product => {
      Section.findOneAndUpdate(
        { _id: sectionId },
        { $push: { components: { componentId: product._id, type: 'Product' }}},
        { new: true }
      )
      .then(section => res.send({ product, section }))
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


export const get = (req, res) => {
  Product.find({})
    .then(docs => res.send(docs))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/products/product-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  const productSlug = values ? `${slugIt(values.name)}/${_id}` : null
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
              productSlug,
              values
            }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Product.findOneAndUpdate(
            { _id }, { $set: { 'image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
      break

    case 'UPDATE_VALUES':
      Product.findOneAndUpdate(
        { _id },
        { $set: { values, productSlug }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => {
        console.error(error)
        res.status(400).send()
      })
      break

    default:
      return
  }
}


export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Product.findOne({ _id })
    .then(product => {
      product.remove()
        .then(product => {
          Section.findOneAndUpdate(
            { _id: product.sectionId },
            { $pull: { components: { componentId: product._id }}},
            { new: true }
          )
          .then(section => res.send({ product, section }))
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
}
