import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Brand from '../models/Brand'
import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'

const brands = express.Router()

const s3Path = `${process.env.APP_NAME}/brand/image_`


// Create
brands.post('/', authenticate(['admin']), (req, res) => {
  const _id = new ObjectID()
  const brand = new Brand({ _id })
  brand.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Read
brands.get('/', (req, res) => {
  Brand.find({})
    .then(doc => {
      res.send(doc)
    })
    .catch(err => res.status(400).send(err))
})

// By page name
brands.get('/:_id', (req, res) => {
  const _id = req.params._id
  Brand.find({ _id })
    .then((doc) => res.send(doc))
    .catch((err) => res.status(400).send(err))
})





// Update
brands.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, values } = req.body
  const newValues = !values ? null : {
    name: values.name,
    street: values.street,
    city: values.city,
    state: values.state,
    zip: values.zip,
    phone: values.phone,
    fontFamily: values.fontFamily,
    facebook: values.facebook,
    github: values.github,
    google: values.google,
    instagram: values.instagram,
    linkedin: values.linkedin,
    twitter: values.twitter,
    yelp: values.yelp,
    youtube: values.youtube,
    appBar: {
      color: values.appBarColor,
      textColor: values.appBarTextColor,
    },
    palette: {
      primary1Color: values.primary1Color,
      primary2Color: values.primary2Color,
      primary3Color: values.primary3Color,
      accent1Color: values.accent1Color,
      accent2Color: values.accent2Color,
      accent3Color: values.accent3Color,
      textColor: values.textColor,
      alternateTextColor: values.alternateTextColor,
      canvasColor: values.canvasColor,
      borderColor: values.borderColor,
      disabledColor: values.disabledColor,
      pickerHeaderColor: values.pickerHeaderColor,
      clockCircleColor: values.clockCircleColor,
      shadowColor: values.shadowColor
    }
  }

  switch (type) {
    case 'UPDATE_IMAGE':
      uploadFile({ Key: `${s3Path}${_id}`, Body: image })
        .then(data => {
          const update = { image: data.Location }
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: `${s3Path}/${_id}` })
        .then(() => {
          const update = { image: null }
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.log(err)
              res.status(400).send(err)
            })
          .catch(err => res.status(400).send(err))
        })
      break

    case 'UPDATE_ITEM':
      Brand.findOneAndUpdate({ _id }, { $set: { values: newValues }}, { new: true })
        .then(doc => {
          res.send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      break

    default:
      return
  }
})




// Delete
brands.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Brand.findOneAndRemove({ _id,})
    .then(_id => res.send(_id))
    .catch(err => res.status(400).send(err))
})




export default brands
