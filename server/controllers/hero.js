import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import Hero from '../models/Hero'
import { deleteFile, uploadFile } from '../middleware/s3'

// Find out why req is empty
export const add = (req, res) => {
  const { pageId, pageSlug, sectionId } = req.body
  const newDoc = new Hero({
    section: ObjectID(sectionId),
    page: ObjectID(pageId),
    pageSlug,
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $push: { items: { kind: 'Hero', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ editItem: doc, page }))
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


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    image,
    backgroundImage,
    pageSlug,
    oldImageSrc,
    oldBackgroundImageSrc,
    type,
    values
  } = req.body
  const appUrl = req.get('host')
  const imageKey = `${rootUrl}/page-${pageSlug}/hero-${_id}_${moment(Date.now()).format("YYYY/MM/DD_h-mm-ss-a")}`
  const backgroundImageKey = `${rootUrl}/page-${pageSlug}/hero-background-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_BACKGROUND_IMAGE_AND_VALUES':
      uploadFile({ Key: imageKey }, image.src, oldImageSrc)
      .then(data => {
        Hero.findOneAndUpdate(
          { _id },
          { $set: {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            }
          }},
          { new: true }
        )
        .then(() => {
          uploadFile({ Key: backgroundImageKey }, backgroundImage.src, oldBackgroundImageSrc)
          .then(data => {
            Hero.findOneAndUpdate(
              { _id },
              { $set: {
                backgroundImage: {
                  src: data.Location,
                  width: image.width,
                  height: image.height
                },
                values
              }},
              { new: true }
            )
            .then(hero => {
              Page.findOne({ _id: hero.page })
              .then(page => res.send({ page }))
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
      break

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key: imageKey }, image.src, oldImageSrc)
      .then(data => {
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
        .then(hero => {
          Page.findOne({ _id: hero.page })
          .then(page => res.send({ page }))
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
      break

    case 'UPDATE_BACKGROUND_IMAGE_AND_VALUES':
      uploadFile({ Key: backgroundImageKey }, backgroundImage.src, oldBackgroundImageSrc)
      .then(data => {
        Hero.findOneAndUpdate(
          { _id },
          { $set: {
            backgroundImage: {
              src: data.Location,
              width: backgroundImage.width,
              height: backgroundImage.height
            },
            values
          }},
          { new: true }
        )
        .then(hero => {
          Page.findOne({ _id: hero.page })
          .then(page => res.send({ page }))
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
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
      .then(() => {
        Hero.findOneAndUpdate(
          { _id },
          { $set: { 'image.src': null }},
          { new: true }
        )
        .then(hero => {
          Page.findOne({ _id: hero.page })
          .then(page => res.send({ page }))
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
      break

    case 'DELETE_BACKGROUND_IMAGE':
      deleteFile({ Key: backgroundImage.src })
      .then(() => {
        Hero.findOneAndUpdate(
          { _id },
          { $set: { 'backgroundImage.src': null }},
          { new: true }
        )
        .then(hero => {
          Page.findOne({ _id: hero.page })
          .then(page => res.send({ page }))
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
      break

    case 'UPDATE_VALUES':
      Hero.findOneAndUpdate(
        { _id },
        { $set: { values }},
        { new: true }
      )
      .then(hero => {
        Page.findOne({ _id: hero.page })
        .then(page => res.send({ page }))
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
    default:
      return
  }
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Hero.findOneAndRemove({ _id })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $pull: { items: { kind: 'Hero', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ page }))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}
