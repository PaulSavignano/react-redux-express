import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Theme from '../models/Theme'
import { authenticate } from '../../middleware/authenticate'
import { handleS3 } from '../../middleware/s3'

const themes = express.Router()



// Create
themes.post('/', (req, res) => {
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
themes.patch('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  const { image, values } = req.body
  const hasImage = image ? true : false
  const urlParse = hasImage ? url.parse(image) : null
  const hasUrl = urlParse.slashes ? true : false
  const Key = `theme/favicon/${_id}`
  const Body = hasUrl ? null : image
  const newValues = {
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
  handleS3({ hasUrl, hasImage, image, Key, Body })
    .then(data => {
      Theme.findOneAndUpdate({ _id }, { $set: { image: data.Location, values: newValues }}, { new: true })
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
})




// Delete
themes.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Theme.findOneAndRemove({ _id,})
    .then(_id => res.send(_id))
    .catch(err => res.status(400).send(err))
})




export default themes
