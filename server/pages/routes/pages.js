import express from 'express'
import { ObjectID } from 'mongodb'
import Page from '../models/Page'
import { authenticate } from '../../middleware/authenticate'
import uploadFile from '../../middleware/s3'

import path from 'path'
import fs from 'fs'

const pages = express.Router()

// Create
pages.post('/', authenticate(['admin']), (req, res) => {
  const page = new Page({
    name: req.body.name,
    contents: req.body.contents
  })
  page.save()
  .then(doc => {
    uploadFile({ Key: `pages/${doc.name}/${doc._id}`, Body: req.body.image })
      .then(data => {
        Page.findOne({ _id: doc._id })
          .then(page => {
            page.contents.image = data.Location
            product.save()
              .then(doc => res.send(doc))
          })
      })
  })
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
  const { type } = req.body
  const { heroImage, heroTitle, heroText } = req.body.contents
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Page.findOne({ _id })
    .then(page => {
      switch (type) {
        case 'UPDATE_HERO':
          uploadFile({ Key: 'pages/home/heroImage', Body: heroImage })
            .then(data => {
              page.contents.heroImage = data.Location
              page.contents.heroTitle = heroTitle
              page.contents.heroText = heroText
              page.save().then(page => res.send(page))
            })
            .catch(err => res.status(400).send(err))
          break
        // case 'UPDATE_FEATURES':
        //   const index = page.contents.features.map(f => f._id.toHexString()).indexOf(req.body.)
        //   contents.features[index].image = contents.features.image
        //   contents.features[index].title = contents.features.title
        //   contents.features[index].description = contents.features.description
        //   page.save()
        //     .then(page => res.send(page))
        //   break
        default:
            return
          }


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
