import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'

import Page from '../models/Page'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import slugIt from '../middleware/slugIt'

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
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      } else {
        return res.status(400).send({ error: 'That name already exists'})
      }
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ error: 'That user was not found' })
    })
})



// Read
pages.get('/', (req, res) => {
  Page.find({})
    .then(pages => res.send(pages))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

// By page name
pages.get('/:_id', (req, res) => {
  const _id = req.params._id
  Page.find({ _id })
    .then(page => res.send(page))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})





// Update
pages.patch('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { name } = req.body
  const slug = slugIt(name)
  Page.findOneAndUpdate({ _id }, { $set: { name, slug }}, { new: true })
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
  })




// Delete
pages.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Page.findOne({ _id,})
    .then(page => {
      page.remove().then(page => res.send(page).catch(err => console.error(err)))
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})




export default pages
