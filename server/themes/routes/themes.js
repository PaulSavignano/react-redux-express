import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Theme from '../models/Theme'
import authenticate from '../../middleware/authenticate'
import { uploadFile, deleteFile } from '../../middleware/s3'

const themes = express.Router()

const s3Path = `${process.env.APP_NAME}/theme/favicon_`


// Create
themes.post('/', authenticate(['admin']), (req, res) => {
  console.log('inside route')
  const _id = new ObjectID()
  const theme = new Theme({ _id })
  theme.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err))
})



// Read
themes.get('/', (req, res) => {
  Theme.find({})
    .then(doc => {
      res.send(doc)
    })
    .catch(err => res.status(400).send(err))
})

// By page name
themes.get('/:_id', (req, res) => {
  const _id = req.params._id
  Theme.find({ _id })
    .then((doc) => res.send(doc))
    .catch((err) => res.status(400).send(err))
})





// Update
themes.patch('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { type, image, values } = req.body
  const newValues = !values ? null : {
    fontFamily: values.fontFamily,
    appBar: {
      appBarColor: values.appBarColor,
      appBarTextColor: values.appBarTextColor,
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
          Theme.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              console.log('update image success', doc)
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
          const update = { image: null, values: newValues }
          Theme.findOneAndUpdate({ _id }, { $set: update }, { new: true })
            .then(doc => {
              console.log(doc)
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
      Theme.findOneAndUpdate({ _id }, { $set: { values: newValues }}, { new: true })
        .then(doc => {
          console.log(doc)
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
themes.delete('/:_id', authenticate(['admin']), (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Theme.findOneAndRemove({ _id,})
    .then(_id => res.send(_id))
    .catch(err => res.status(400).send(err))
})




export default themes
