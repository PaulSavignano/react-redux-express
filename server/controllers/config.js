import { ObjectID } from 'mongodb'

import Config from '../models/Config'

export const add = (req, res) => {
  const { values } = req.body
  const newDoc = new Config({ values })
  newDoc.save()
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  return Config.find({})
  .then(config => res.send(config))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const update = (req, res) => {
  const { _id } = req.params
  const { values } = req.body
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  Config.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Config.findOneAndRemove({ _id })
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
