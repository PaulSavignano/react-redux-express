import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import moment from 'moment'

import Brand from '../models/Brand'
import { uploadFile, deleteFile } from '../middleware/s3'


export const add = (req, res) => {
  const _id = new ObjectID()
  const brand = new Brand({ _id })
  brand.save()
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const get = (req, res) => {
  Brand.find({})
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const getId = (req, res) => {
  const _id = req.params._id
  Brand.find({ _id })
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateAppBar = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, oldImageSrc, values } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/brand_${_id}/appBar_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImageSrc)
      .then(data => {
        Brand.findOneAndUpdate(
          { _id },
          { $set: {
            appBar: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }
          }},
          { new: true }
        )
        .then(doc => res.send(doc))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'DELETE_IMAGE_AND_UPDATE_VALUES':
      deleteFile({ Key: oldImageSrc })
      .then(() => {
        Brand.findOneAndUpdate(
          { _id },
          { $set: {
            'appBar.image.src': null,
            values
          }
        },
          { new: true }
        )
        .then(doc => res.send(doc))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate(
        { _id },
        { $set: { 'appBar.values': values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    default:
      return
  }
}


export const updateArticleStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { articleStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}


export const updateBusiness = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, oldImageSrc, values } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/brand_${_id}/business_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImageSrc)
      .then(data => {
        Brand.findOneAndUpdate(
          { _id },
          { $set: {
            business: {
              image: {
                src: data.Location,
                width: image.width,
                height: image.height
              },
              values
            }
          }},
          { new: true }
        )
        .then(doc => res.send(doc))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'DELETE_IMAGE_AND_UPDATE_VALUES':
      deleteFile({ Key: image.src })
      .then(() => {
        Brand.findOneAndUpdate(
          { _id },
          { $set: {
            'business.image.src': null,
            values
          }},
          { new: true }
        )
        .then(doc => res.send(doc))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate(
        { _id },
        { $set: { 'business.values': values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    default:
      return
  }
}

export const updateBodyStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  const update = { body: { values } }
  Brand.findOneAndUpdate(
    { _id },
    { $set: { bodyStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateCardStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { cardStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}


export const updateFooter = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, oldImageSrc, values } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/brand-${_id}/footer_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, oldImageSrc)
        .then(data => {
          Brand.findOneAndUpdate(
            { _id },
            { $set: {
              footer: {
                image: {
                  src: data.Location,
                  width: image.width,
                  height: image.height
                },
                values
              }
            }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => { console.error(error); res.status(400).send({ error })})
        })
        .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'DELETE_IMAGE_AND_UPDATE_VALUES':
      deleteFile({ Key: image.src })
        .then(() => {
          Brand.findOneAndUpdate(
            { _id },
            { $set: {
              'footer.image.src': null,
              values
            }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => { console.error(error); res.status(400).send({ error })})
        })
        .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate(
        { _id },
        { $set: { 'footer.values': values }},
        { new: true }
      )
      .then(doc => {
        res.send(doc)
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
      break

    default:
      return
  }
}


export const updateHeroStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { heroStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

// Update Theme
export const updatePalette = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { palette: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateProductStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { productStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateTypography = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { typography: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



// Delete
export const remove = (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Brand.findOneAndRemove({ _id })
  .then(_id => res.send(_id))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
