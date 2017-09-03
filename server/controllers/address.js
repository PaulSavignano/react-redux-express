import { ObjectID } from 'mongodb'

import Address from '../models/Address'
import User from '../models/User'

export const add = (req, res) => {
  const { user } = req
  const newDoc = new Address({
    user: ObjectID(user._id),
    values: {}
  })
  newDoc.save()
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user },
      { $push: { addresses: address._id }},
      { new: true }
    )
    .populate('addresses')
    .then(user => res.send(user))
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

export const adminAdd = (req, res) => {
  const { user } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
  const { userId } = req.params
  const newAddress = new Address({
    user: ObjectID(userId),
    values: {}
  })
  newAddress.save()
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user },
      { $push: { addresses: address._id }},
      { new: true }
    )
    .populate('addresses')
    .then(user => res.send(user))
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

export const get = (req, res) => {
  const { user } = req
  const isAdmin = user.roles.some(role => role === 'admin')
  if (isAdmin) {
    Address.find({})
      .then(addresses => res.send(addresses))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
  } else {
    Address.find({ user: user._id })
    .then(addresses => res.send(addresses))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  }
}



export const update = (req, res) => {
  const { user } = req
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const { values } = req.body
  Address.findOneAndUpdate(
    { _id, user: user._id },
    { $set: { values }},
    { new: true }
  )
  .then(address => {
    User.findOne({ _id: address.user })
    .then(user => res.send(user))
    .catch(error => {
      console.log({ error })
      res.status(400).send({ error })
    })
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error })
  })
}

export const adminUpdate = (req, res) => {
  const { user } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const { values } = req.body
  Address.findOneAndUpdate(
    { _id },
    { $set: { values }},
    { new: true }
  )
  .then(address => {
    User.findOne({ _id: address.user })
    .then(user => res.send(user))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error })
  })
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Address.findOneAndRemove({ _id })
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user },
      { $pull: { addresses:  address._id }},
      { new: true }
    )
    .then(user => res.send({ address, user }))
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

export const adminRemove = (req, res) => {
  const { user } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
  const { _id, userId } = req.params
  if (!ObjectID.isValid(_id) || !ObjectID.isValid(userId)) return res.status(404).send({ error: 'Invalid id'})
  Address.findOneAndRemove({ _id })
  .then(address => {
    User.findOneAndUpdate(
      { _id: address.user },
      { $pull: { addresses:  address._id }},
      { new: true }
    )
    .then(user => res.send({ address, user }))
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
