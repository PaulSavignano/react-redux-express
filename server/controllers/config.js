import { ObjectID } from 'mongodb'

import Config from '../models/Config'

export const add = (req, res) => {
  const {
    body: { values },
    hostname
  } = req
  const newDoc = new Config({ values, hostname })
  newDoc.save()
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  return Config.find({ hostname })
  .then(config => res.send(config))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id },
  } = req.params
  Config.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Config.findOneAndRemove({ _id, hostname })
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
