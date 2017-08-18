import { ObjectID } from 'mongodb'
import moment from 'moment'

import Hero from '../models/Hero'
import Section from '../models/Section'
import { deleteFile, uploadFile } from '../middleware/s3'


export const add = (req, res) => {
  const { sectionId, pageSlug } = req.body
  const newDoc = new Hero({
    sectionId: ObjectID(sectionId),
    pageSlug,
    image: null,
    values: []
  })
  newDoc.save()
    .then(hero => {
      Section.findOneAndUpdate(
        { _id: sectionId },
        { $push: { components: { componentId: hero._id, type: 'Hero' }}},
        { new: true }
      )
      .then(section => res.send({ hero, section }))
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
  Hero.find({})
    .then(docs => res.send(docs))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}


const getId = (req, res) => {
  const _id = req.params._id
  Hero.find({ _id })
    .then(doc => res.send(doc))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, sectionId, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/cards/hero-${_id}-${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            values
          }
          Hero.findOneAndUpdate(
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
          .then(doc => res.send(doc))
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

    case 'DELETE_IMAGE_UPDATE_VALUES':
      deleteFile({ Key: image.src })
        .then(() => {
          Hero.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null, values }},
            { new: true }
          )
          .then(doc => res.send(doc))
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
          Hero.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
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
      Hero.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(doc => res.send(doc))
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
  Hero.findOne({ _id })
    .then(hero => {
      hero.remove()
        .then(hero => {
          Section.findOneAndUpdate(
            { _id: hero.sectionId },
            { $pull: { components: { componentId: hero._id }}},
            { new: true }
          )
          .then(section => res.send({ hero, section }))
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
