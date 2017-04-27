import express from 'express'
import { ObjectID } from 'mongodb'
import Page from '../models/Page'
import { authenticate } from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'

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
  if (!ObjectID.isValid(pageId)) return res.status(404).send()
  const { type, component } = req.body
  console.log(type)
  Page.findOne({ _id: pageId })
    .then(page => {
      const componentId = ObjectID(component._id) || null
      const newComponentId = new ObjectID()
      const existingComponent = page.components.filter(c => c._id.toHexString() === component._id)
      const oldKey = `pages/${page.slug}/${component.type}s/${component._id}` || null
      const Key = `pages/${page.slug}/${component.type}s/${component._id}` || null
      const Body = component.image || null

      switch (type) {

        case 'ADD_COMPONENT':
          if (component.image) {
            console.log('has no componentId but has image')
            uploadFile({ Key: `pages/${page.slug}/${component.type}s/${newComponentId}`, Body: component.image })
              .then(data => {
                component._id = newComponentId
                component.image = data.Location
                Page.findOneAndUpdate({ _id: pageId }, { $push: { components: component }}, { new: true })
                  .then(doc => {
                    console.log(doc)
                    res.send(doc)
                  })
                  .catch(err => {
                    console.log(err)
                    res.status(400).send(err)
                  })
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          } else {
            console.log('has no componentId and no image')
            component._id = newComponentId
            Page.findOneAndUpdate({ _id: pageId }, { $push: { components: component }}, { new: true })
              .then(doc => res.send(doc))
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          }
          break


        case 'UPDATE_COMPONENT':
          console.log('existing component')
          if (Body) {
            console.log('has Body')
            uploadFile({ Key, Body })
              .then(data => {
                component._id = componentId
                component.image = data.Location
                Page.findOneAndUpdate({ _id: pageId, 'components._id': component._id }, { $set: { 'components.$': component }}, { new: true })
                  .then(doc => {
                    console.log(doc)
                    res.send(doc)
                  })
                  .catch(err => {
                    console.log(err)
                    res.status(400).send(err)
                  })
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          } else if (existingComponent.image) {
            console.log('has existing image')
            deleteFile({ Key: oldKey })
              .then(() => {
                component._id = componentId
                Page.findOneAndUpdate({ _id: pageId, 'components._id': component._id }, { $set: { 'components.$': component }}, { new: true })
                  .then(doc => {
                    console.log(doc)
                    res.send(doc)
                  })
                  .catch(err => {
                    console.log(err)
                    res.status(400).send(err)
                  })
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          } else {
            console.log('has no Body and no existing image')
            component._id = newComponentId
            Page.findOneAndUpdate({ _id: pageId, 'components._id': component._id }, { $set: { 'components.$': component }}, { new: true })
              .then(doc => {
                console.log(doc)
                res.send(doc)
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          }
          break


        case 'DELETE_COMPONENT':
          console.log('delete component')
          console.log(oldKey)
          if (oldKey) {
            console.log('has existing image')
            deleteFile({ Key: oldKey })
              .then(() => {
                Page.findOneAndUpdate({ _id: pageId, 'components._id': component._id }, { $pull: { 'components': { _id: componentId } }}, { new: true })
                  .then(doc => {
                    console.log(doc)
                    res.send(doc)
                  })
                  .catch(err => {
                    console.log(err)
                    res.status(400).send(err)
                  })
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          } else {
            console.log('has no Body and no existing image')
            Page.findOneAndUpdate({ _id: pageId, 'components._id': componentId }, { $pull: { 'components': { _id: componentId } }}, { new: true })
              .then(doc => {
                console.log(doc)
                res.send(doc)
              })
              .catch(err => {
                console.log(err)
                res.status(400).send(err)
              })
          }
          break
        default:
          return
      }
    })
    .catch(err => {
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