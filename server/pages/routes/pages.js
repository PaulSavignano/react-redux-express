import express from 'express'
import { ObjectID } from 'mongodb'
import Page from '../models/Page'
import { authenticate } from '../../middleware/authenticate'
import uploadFile from '../../middleware/s3'

import path from 'path'
import fs from 'fs'

const pages = express.Router()

// Create
pages.post('/', (req, res) => {
  Page.findOne({ name: req.body.name })
    .then(doc => {
      if (!doc) {
        const page = new Page({
          name: req.body.name,
          slug: req.body.name.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase(),
        })
        page.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
      } else {
        return res.status(400).send({ error: 'That name already exists'})
      }
    })
    .catch(err => console.log('err', err))
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
pages.patch('/:pageId', (req, res) => {
  const pageId = req.params.pageId
  const { type, component, visible, contents, _id } = req.body
  console.log(component)
  if (!ObjectID.isValid(pageId)) return res.status(404).send()
  Page.findOne({ _id: pageId })
    .then(page => {
      switch (type) {
        case 'UPDATE_HERO':
          uploadFile({ Key: `pages/${page.name}/hero/image`, Body: contents.image })
            .then(data => {
              console.log(_id)
              const index = page.components.map(c => c._id.toHexString()).indexOf(_id)
              console.log(index)
              if (index === -1) {
                page.components.push({
                  visible,
                  component,
                  contents: {
                    image: data.Location,
                    title: contents.title,
                    text: contents.text,
                  }
                })
                page.save().then(page => res.send(page))
              } else {
                page.components[index] = {
                  visible,
                  component,
                  contents: {
                    image: data.Location,
                    title: contents.title,
                    text: contents.text,
                  }
                }
                page.save().then(page => res.send(page))
              }
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          break
          case 'ADD_CARD':
            uploadFile({ Key: `pages/${page.name}/cards/image`, Body: contents.image })
              .then(data => {
                page.components.push({
                  component,
                  contents: {
                    header: contents.header,
                    image: data.Location,
                    title: contents.title,
                    text: contents.text,
                  }
                })
                page.save().then(page => res.send(page))
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
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
