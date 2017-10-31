import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import ContactForm from '../models/ContactForm'
import Section from '../models/Section'

export const add = (req, res) => {
  const {
    body: { pageId, pageSlug, sectionId },
    hostname
  } = req
  const newDoc = new ContactForm({
    hostname,
    page: ObjectID(pageId),
    pageSlug,
    section: ObjectID(sectionId),
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section, hostname },
      { $push: { items: { kind: 'ContactForm', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ editItem: doc, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { type, values },
    hostname,
    params: { _id },
  } = req
  return ContactForm.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(doc => {
    Page.findOne({ _id: doc.page, hostname })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id },
  } = req
  ContactForm.findOneAndRemove({ _id, hostname })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section, hostname },
      { $pull: { items: { kind: 'ContactForm', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page, hostname })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
