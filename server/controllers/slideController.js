import { ObjectID } from 'mongodb'
import moment from 'moment'

import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import Slide from '../models/Slide'
import Section from '../models/Section'

const slides = express.Router()


export const create = (req, res) => {
  const { carouselId } = req.body
  const newSlide = new Slide({
    carouselId: ObjectID(carouselId),
    image: null,
    values: []
  })
  newSlide.save()
    .then(slide => {
      Carousel.findOneAndUpdate(
        { _id: carouselId },
        { $push: { slides: { slideId: slide._id }}},
        { new: true }
      )
      .then(carousel => res.send({ carousel, slide }))
      .catch(err => {
        console.error(err)
        res.status(400).send()
      })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
}



export const read = (req, res) => {
  Slide.find({})
    .then(docs => res.send(docs))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
}



export const update = (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, carouselId, image, oldImage, values } = req.body
  const Key = `${process.env.APP_NAME}/carousel_${carouselId}/slide_${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
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
          Slide.findOneAndUpdate(
            { _id },
            { $set: update },
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
          Slide.findOneAndUpdate(
            { _id },
            { $set: { 'image.src': null }},
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
      Slide.findOneAndUpdate(
        { _id },
        { $set: { values }},
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
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Slide.findOne({ _id })
    .then(slide => {
      if (slide.sectionId) {
        Section.findOneAndUpdate({ _id: slide.sectionId }, { $pull: { components: { componentId: slide._id }}}, { new: true })
          .then(section => res.send({ slide, section }))
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
      } else {
        res.send({ slide })
      }

    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
}
