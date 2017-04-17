import express from 'express'
import { ObjectID } from 'mongodb'
import Page from '../models/Page'
import { authenticate } from '../../middleware/authenticate'

const pages = express.Router()

// Create
pages.post('/', authenticate(['admin']), (req, res) => {
  console.log(req.body)
  const page = new Page({
    name: req.body.name,
  })
  page.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Read
pages.get('/', (req, res) => {
  Page.find({})
    .then(pages => res.send(pages))
    .catch(err => res.status(400).send(err))
})

// By page name
pages.get('/:_id', (req, res) => {
  const _id = req.params._id
  Page.find({ _id })
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})




// Update
pages.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { name, contents } = req.body
  const type = req.body
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  console.log(req.body)
  Page.findOne({ _id })
    .then(page => {
      // switch (type) {
      //   case 'contents':
      const { contents } = page.contents
      const index = page.contents.features.map(i => i.productId.toHexString()).indexOf(product.productId)
      contents.features[index].image = contents.features.image
      contents.features[index].title = contents.features.title
      contents.features[index].description = contents.features.description
      page.save()
        .then(page => res.send(page))
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Delete
pages.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Page.findOneAndRemove({ _id,})
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})




export default pages
