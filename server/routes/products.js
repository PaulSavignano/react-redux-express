import express from 'express'
import { ObjectID } from 'mongodb'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import slugIt from '../middleware/slugIt'
import Product from '../models/Product'
import Section from '../models/Section'

const products = express.Router()

const s3Path = `${process.env.APP_NAME}/products`

// Create
products.post('/', (req, res) => {
  const { pageId, sectionId } = req.body
  const product = new Product({
    pageId: ObjectID(pageId),
    sectionId: ObjectID(sectionId),
    image: null,
    values: []
  })
  product.save()
    .then(product => {
      const update = {
        components: {
          componentId: product._id,
          type: 'Product'
        }
      }
      Section.findOneAndUpdate({ _id: sectionId }, { $push: update }, { new: true })
        .then(section => {
          res.send({ product, section })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Read
products.get('/', (req, res) => {
  Product.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

// By product name
products.get('/:_id', (req, res) => {
  const _id = req.params._id
  Product.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Update
products.patch('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, values } = req.body
  const Key = `${s3Path}/${_id}`
  const slug = values ? `products/${slugIt(values.name)}/${_id}` : null
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            slug,
            values
          }
          Product.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          const update = { image: { src: null, width: null, height: null }}
          Product.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'UPDATE_VALUES':
      Product.findOneAndUpdate({ _id }, { $set: { values, slug }}, { new: true })
        .then(doc => {
          res.send(doc)
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      break

    default:
      return
  }
})



// Delete

products.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Product.findOne({ _id })
    .then(product => {
      product.remove()
        .then(product => {
          Section.findOneAndUpdate({ _id: product.sectionId }, { $pull: { components: { componentId: product._id }}}, { new: true })
            .then(section => res.send({ product, section }))
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



export default products
