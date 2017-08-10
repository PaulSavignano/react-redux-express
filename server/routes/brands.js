import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Brand from '../models/Brand'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import moment from 'moment'

const brands = express.Router()

const s3Path = `${process.env.APP_NAME}/brand/`


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
    .then(doc => res.send(doc))
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




// Update AppBar
brands.patch('/appbar/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, oldImage, values } = req.body
  const Key = `${s3Path}${_id}/appBar_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImage)
        .then(data => {
          const update = {
            appBar: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }
          }
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => res.send(doc))
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
      deleteFile({ Key: image.src })
        .then(() => {
          Brand.findOneAndUpdate({ _id }, { $set: { 'appBar.image.src': null }}, { new: true })
            .then(doc => res.send(doc))
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

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate({ _id }, { $set: { 'appBar.values': values }}, { new: true })
        .then(doc => res.send(doc))
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
      break

    default:
      return
  }
})




// Update Business
brands.patch('/business/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { values } = req.body
  const update = { business: req.body }
  Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})







// Update Main
brands.patch('/main/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { values } = req.body
  const update = { main: { values } }
  Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})






// Update Footer
brands.patch('/footer/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, oldImage, values } = req.body
  const Key = `${s3Path}${_id}/footer_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImage)
        .then(data => {
          const update = {
            footer: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }
          }
          Brand.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => res.send(doc))
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
      deleteFile({ Key: image.src })
        .then(() => {
          const update = {
            footer: {
              image: null
            }
          }
          Brand.findOneAndUpdate({ _id }, { $set: { 'footer.image.src': null }}, { new: true })
            .then(doc => res.send(doc))
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

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate({ _id }, { $set: { 'footer.values': values }},  { new: true })
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


// Update Theme
brands.patch('/theme/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const {
    fontFamily,
    primary1Color,
    primary2Color,
    primary3Color,
    accent1Color,
    accent2Color,
    accent3Color,
    textColor,
    secondaryTextColor,
    alternateTextColor,
    canvasColor,
    borderColor,
    disabledColor,
    pickerHeaderColor,
    clockCircleColor,
    shadowColor
  } = req.body.values
  const update = {
      fontFamily,
      palette: {
        primary1Color,
        primary2Color,
        primary3Color,
        accent1Color,
        accent2Color,
        accent3Color,
        textColor,
        secondaryTextColor,
        alternateTextColor,
        canvasColor,
        borderColor,
        disabledColor,
        pickerHeaderColor,
        clockCircleColor,
        shadowColor
    }
  }
  Brand.findOneAndUpdate({ _id }, { $set: { theme: {...update} }}, { new: true })
    .then(doc => res.send(doc))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
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
