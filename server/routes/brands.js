import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Brand from '../models/Brand'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'

const brands = express.Router()

const s3Path = `${process.env.APP_NAME}/brand/image_`


// Create
brands.post('/', authenticate(['admin']), (req, res) => {
  const _id = new ObjectID()
  const brand = new Brand({ _id })
  brand.save()
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Read
brands.get('/', (req, res) => {
  Brand.find({})
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})

// By page name
brands.get('/:_id', (req, res) => {
  const _id = req.params._id
  Brand.find({ _id })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})





// Update
brands.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, values } = req.body
  const Key = `${s3Path}${_id}`
  const newValues = values && {
    business: {
      name: values.name,
      description: values.description,
      phone: values.phone,
      email: values.email,
      street: values.street,
      city: values.city,
      state: values.state,
      zip: values.zip
    },
    socialMedia: {
      facebook: values.facebook,
      github: values.github,
      google: values.google,
      instagram: values.instagram,
      linkedin: values.linkedin,
      twitter: values.twitter,
      yelp: values.yelp,
      youtube: values.youtube
    },
    theme: {
      fontFamily: values.fontFamily,
      fontFamily2: values.fontFamily2,
      fontFamily3: values.fontFamily2,
      appBar: {
        color: values.appBarColor,
        textColor: values.appBarTextColor,
      },
      main: {
        color: values.mainColor,
      },
      footer: {
        color: values.footerColor,
        textColor: values.footerTextColor
      },
      palette: {
        primary1Color: values.primary1Color,
        primary2Color: values.primary2Color,
        primary3Color: values.primary3Color,
        accent1Color: values.accent1Color,
        accent2Color: values.accent2Color,
        accent3Color: values.accent3Color,
        textColor: values.textColor,
        secondaryTextColor: values.secondaryTextColor,
        alternateTextColor: values.alternateTextColor,
        canvasColor: values.canvasColor,
        borderColor: values.borderColor,
        disabledColor: values.disabledColor,
        pickerHeaderColor: values.pickerHeaderColor,
        clockCircleColor: values.clockCircleColor,
        shadowColor: values.shadowColor
      }
    }
  }
  switch (type) {
    case 'UPDATE_IMAGE':
      uploadFile({ Key }, image.src)
        .then(data => {
          const update = { image: { src: data.Location, width: image.width, height: image.height }}
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => {
          const update = { image: null }
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
          .catch(err => {
            console.error(err)
            res.status(400).send()
          })
        })
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate({ _id }, { $set: newValues }, { new: true })
        .then(doc => {
          res.send(doc)
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
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
  Brand.findOne({ _id })
    .then(_id => res.send(_id))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})




export default brands
