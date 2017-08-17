import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile, deleteFiles } from '../middleware/s3'


export const add = (req, res) => {
  console.log('adding ')
  const { pageId, pageSlug } = req.body
  const newSection = new Section({
    pageId: ObjectID(pageId),
    pageSlug
  })
  newSection.save()
    .then(section => {
      Page.findOneAndUpdate(
        { _id: pageId },
        { $push: { sections: { sectionId: section._id }}},
        { new: true }
      )
      .then(page => res.send({ section, page }))
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
  Section.find({})
    .then(docs => res.send(docs))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}

export const getId = (req, res) => {
  const _id = req.params._id
  Section.find({ _id })
    .then(doc => res.send(doc))
    .catch(error => {
      console.error(error)
      res.status(400).send()
    })
}


export const update = (req, res) => {
  const { _id } = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { componentId, type, pageId, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/sections/section_${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
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
          Section.findOneAndUpdate(
            { _id },
            { $set: { image: { src: data.Location, width: image.width, height: image.height }}},
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
          Section.findOneAndUpdate(
            { _id },
            { $set: { 'appBar.image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send()
          })
        })
      break

    case 'UPDATE_VALUES':
      Section.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => {
        console.error(error)
        res.status(400).send()
      })
      break

    case 'ADD_CONTACT_FORM':
      Section.findOneAndUpdate(
        { _id },
        { $push: {
          components: {
            componentId: new ObjectID(),
            typef: 'Contact'
          }
        }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => {
        console.error(error)
        res.status(400).send()
      })
      break

    case 'DELETE_CONTACT_FORM':
      Section.findOneAndUpdate(
        { _id },
        { $pull: {
          components: {
            componentId,
          }
        }},
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
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Section.findOne({ _id })
  .then(section => {
    section.remove()
      .then(section => {
        Page.findOneAndUpdate(
          { _id: section.pageId }, 
          { $pull: { sections: { sectionId: section._id }}},
          { new: true }
        )
        .then(page => res.send({ section, page }))
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
