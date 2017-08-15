import Page from '../models/Page'
import Section from '../models/Section'
import { ObjectID } from 'mongodb'
import moment from 'moment'

import Carousel from '../models/Carousel'
import { deleteFile, uploadFile } from '../middleware/s3'


export const add = (req, res) => {
  const { sectionId, pathname } = req.body
  const parent = sectionId ? { sectionId: ObjectID(sectionId) } : { pathname: '/'}
  const slideId = new ObjectID()
  const newCarousel = new Carousel({
    ...parent,
    slides: [{
      _id: slideId,
      image: null,
      values: {}
    }]
  })
  newCarousel.save()
    .then(carousel => {
      if (sectionId) {
        Section.findOneAndUpdate(
          { _id: sectionId },
          { $push: { components: { componentId: carousel._id, type: 'Carousel' }}},
          { new: true }
        )
        .then(section => res.send({ carousel, section, slideId }))
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      } else {
        res.send({ carousel, slideId })
      }
    })
    .catch(err => {
      console.error(error)
      res.status(400).send()
    })
}


export const addSub = (req, res) => {
  console.log('inside addSub')
  const { carouselId } = req.params
  if (!ObjectID.isValid(carouselId)) return res.status(404).send()
  const slideId = new ObjectID()
  Carousel.findOneAndUpdate(
    { _id: carouselId },
    { $push: { slides: { _id: slideId, image: null, values: [] }}},
    { new: true }
  )
  .then(carousel => res.send({ carousel, slideId }))
  .catch(err => {
    console.error(err)
    res.status(400).send()
  })
}






export const get = (req, res) => {
  Carousel.find({})
    .then(docs => {
      res.send(docs)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
}




export const updateSub = (req, res) => {
  console.log('inside update sub')
  const { carouselId, slideId } = req.params
  if (!ObjectID.isValid(carouselId) || !ObjectID.isValid(slideId)) return res.status(404).send()
  const { type, image, oldImage, values } = req.body
  const Key = `${process.env.APP_NAME}/carousel_${carouselId}/slide_${slideId}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {

    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImage)
        .then(data => {
          const update = {
            image: {
              src: data.Location,
              width: image.width,
              height: image.height
            },
            values
          }
          Carousel.findOneAndUpdate(
            { _id: carouselId, 'slides._id': slideId  },
            { $set: { 'slides.$': update }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Carousel.findOneAndUpdate(
            { _id: carouselId, 'slides._id': slideId },
            { $set: { 'slides.$.image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'UPDATE_VALUES':
      Carousel.findOneAndUpdate(
        { _id: carouselId, 'slides._id': slideId },
        { $set: { 'slides.$.values': values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(err => {
        console.error(err)
        res.status(400).send()
      })
      break

    default:
      return
  }
}





export const remove = (req, res) => {
  const { carouselId } = req.params
  if (!ObjectID.isValid(carouselId)) return res.status(404).send()
  Carousel.remove({ _id: carouselId })
    .then(update => res.send(update))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
}


export const removeSub = (req, res) => {
  const { carouselId, slideId } = req.params
  if (!ObjectID.isValid(carouselId) || !ObjectID.isValid(slideId)) return res.status(404).send()
  const { imageSrc } = req.body
  if (imageSrc) deleteFile({ Key: imageSrc }).catch(err => console.error(err))
  Carousel.findOneAndUpdate(
    { _id: carouselId, 'slides._id': slideId },
    { $pull: { slides: { _id }}},
    { new: true }
  )
  .then(carousel => res.send({ carousel, slideId }))
  .catch(err => {
    console.error(err)
    res.status(400).send()
  })
}
