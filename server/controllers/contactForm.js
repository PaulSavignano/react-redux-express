import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import ContactForm from '../models/ContactForm'
import Section from '../models/Section'

export const add = (req, res) => {
  const { pageId, pageSlug, sectionId } = req.body
  const newDoc = new ContactForm({
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $push: { items: { kind: 'ContactForm', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ editItem: doc, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    type,
    values
  } = req.body
  return ContactForm.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  ContactForm.findOneAndRemove({ _id })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $pull: { items: { kind: 'ContactForm', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
