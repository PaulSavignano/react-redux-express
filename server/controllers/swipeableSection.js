import { ObjectID } from 'mongodb'

import Page from '../models/Page'
import SwipeableSection from '../models/SwipeableSection'

export const add = (req, res) => {
  const { pageId } = req.body
  const newDoc = new SwipeableSection({
    page: ObjectID(pageId),
  })
  newDoc.save()
  .then(doc => {
    Page.findOneAndUpdate(
      { _id: doc.page },
      { $push: {
        sections: {
          kind: 'SwipeableSection',
          section: doc._id
        }
      }},
      { new: true }
    )
    .then(() => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ editItem: doc, page }))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
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
  SwipeableSection.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page })
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
  SwipeableSection.remove({ _id })
  .then(swipeableSection => {
    Page.find({ _id: swipeableSection.page })
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
