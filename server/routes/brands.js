import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Brand from '../models/Brand'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'

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
  const { type, image, values } = req.body
  const Key = `${s3Path}${_id}/appBar`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src)
        .then(data => {
          const update = {
            appBar: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              styles: values
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
      deleteFile({ Key })
        .then(() => {
          const update = {
            appBar: {
              image: null
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

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate({ _id }, { $set: { 'appBar.styles': values }}, { new: true })
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
  const update = { main: { styles: values } }
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
  const { type, image, values } = req.body
  const Key = `${s3Path}${_id}/footer`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src)
        .then(data => {
          const update = {
            footer: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              styles: values
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
      deleteFile({ Key })
        .then(() => {
          const update = {
            footer: {
              image: null
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

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate({ _id }, { $set: { 'footer.styles': values }},  { new: true })
        .then(doc => {
          console.log('inside footer update', doc)
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
  console.log(req.body)
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { values } = req.body
  const update = {
      fontFamily: values.fontFamily,
      fontFamily2: values.fontFamily2,
      fontFamily3: values.fontFamily2,
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
