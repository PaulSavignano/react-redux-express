import { ObjectID } from 'mongodb'

import Address from '../models/Address'
import User from '../models/User'

export const add = (req, res) => {
  const { hostname, user } = req
  const newDoc = new Address({
    hostname,
    user: ObjectID(user._id),
    values: {}
  })
  newDoc.save()
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user, hostname },
      { $push: { addresses: address._id }},
      { new: true }
    )
    .populate({ path: 'addresses' })
    .then(user => {
      res.send({ user })
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const adminAdd = (req, res) => {
  const {
    hostname,
    params: { userId },
    user
  } = req
  const newAddress = new Address({
    hostname,
    user: ObjectID(userId),
    values: {}
  })
  newAddress.save()
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user, hostname },
      { $push: { addresses: address._id }},
      { new: true }
    )
    .populate('addresses')
    .then(user => res.send(user))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const get = (req, res) => {
  const { hostname, user } = req
  const isAdmin = user.roles.some(role => role === 'admin')
  if (isAdmin) {
    Address.find({ hostname })
    .then(addresses => res.send(addresses))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  } else {
    Address.find({ user: user._id, hostname })
    .then(addresses => res.send(addresses))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  }
}



export const update = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      values
    },
    hostname,
    params: { _id },
    user
  } = req
  Address.findOneAndUpdate(
    { _id, user: user._id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(address => {
    User.findOne({ _id: address.user, hostname })
    .then(user => res.send(user))
    .catch(error => { console.log({ error }); res.status(400).send({ error })})
  })
  .catch(error => { console.log(error); res.status(400).send({ error })})
}

export const adminUpdate = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id },
    user
  } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
  Address.findOneAndUpdate(
    { _id, hostname },
    { $set: { values }},
    { new: true }
  )
  .then(address => {
    User.findOne({ _id: address.user, hostname })
    .then(user => res.send(user))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.log(error); res.status(400).send({ error })})
}



export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id }
  } = req
  Address.findOneAndRemove({ _id })
  .then(address => {
    return User.findOneAndUpdate(
      { _id: address.user, hostname },
      { $pull: { addresses:  address._id }},
      { new: true }
    )
    .then(() => {
      User.findOne({ _id: req.user._id, hostname })
      .then(user => res.send({ user }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const adminRemove = (req, res) => {
  if (!ObjectID.isValid(req.params._id) || !ObjectID.isValid(req.params.userId)) return res.status(404).send({ error: 'Invalid id'})
  const {
    hostname,
    params: { _id, userId },
    user
  } = req
  Address.findOneAndRemove({ _id, hostname })
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user, hostname },
      { $pull: { addresses:  address._id }},
      { new: true }
    )
    .then(user => res.send({ address, user }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
