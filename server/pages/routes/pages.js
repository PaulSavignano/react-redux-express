import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'

import Page from '../models/Page'
import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'
import slugIt from '../../middleware/slugIt'

const pages = express.Router()



// Create
pages.post('/', authenticate(['admin']), (req, res) => {
  Page.findOne({ name: req.body.name })
    .then(doc => {
      if (!doc) {
        const page = new Page({
          name: req.body.name,
          slug: slugIt(req.body.name),
        })
        page.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
      } else {
        return res.status(400).send({ error: 'That name already exists'})
      }
    })
    .catch(err => {
      console.log('err', err)
      res.status(400).send({ error: 'That user was not found' })
    })
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





// Delete
pages.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Page.findOneAndRemove({ _id,})
    .then((page) => res.send(page))
    .catch((err) => res.status(400).send(err))
})




export default pages
