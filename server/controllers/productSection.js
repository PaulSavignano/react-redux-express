import { ObjectID } from 'mongodb'

import ProductSection from '../models/ProductSection'

export const add = (req, res) => {
  const { pageId } = req.body
  const newDoc = new ProductSection({
    page: ObjectID(pageId),
  })
  newDoc.save()
  .then(() => {
    Page.findOne({ _id: pageId })
    .then(page => res.send({ page }))
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
  })
  .catch(err => {
    console.error(error)
    res.status(400).send()
  })
}

export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  ProductSection.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(() => {
    Page.findOne({ _id: pageId })
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
}

export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  ProductSection.remove({ _id })
  .then(productSection => {
    Page.find({ _id: productSection.page })
    .then(page => res.send({ page }))
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
