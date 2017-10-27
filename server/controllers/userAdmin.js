import { ObjectID } from 'mongodb'
import crypto from 'crypto'
import fetch from 'node-fetch'

import Address from '../models/Address'
import Brand from '../models/Brand'
import Order from '../models/Order'
import User from '../models/User'

export const adminAdd = (req, res) => {
  const { email, firstName, lastName, password } = req.body
  if ( !email || !firstName || !firstName || !password) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  const newUser = new User({
    password,
    values: { email, firstName, lastName }
  })
  newUser.save()
  .then(user => res.send(user))
  .catch(error => {
    console.error('user.save() : ', error)
    res.status(400).send({ error: { email: 'User already exists'}})
  })
}


export const adminGet = (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const adminUpdate = (req, res) => {
  const {
    params: { _id },
    body: { values, type }
  } = req
  switch(type) {
    case 'UPDATE_VALUES':
      return User.findOne({ _id })
        .then(user => {
          if (values.password) {
            user.password = values.password
          }
          user.values = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone
          }
          user.save()
          .then(user => res.send(user))
          .catch(error => { console.error(error); res.status(400).send({ error })})
        })
        .catch(error => { console.error(error); res.status(400).send({ error })})
    case 'UPDATE_ROLES':
      const roles = values.owner ?
      [ 'admin', 'owner', 'user' ]
      :
      values.admin ?
      [ 'admin', 'user' ]
      :
      [ 'user' ]
      return User.findOneAndUpdate(
          { _id },
          { $set: { roles: roles }},
          { new: true }
        )
        .populate('addresses')
        .then(user => {
          res.send(user)
        })
        .catch(error => { console.error(error); res.status(400).send({ error })})
    default:
      return
  }
}

export const adminRemove = (req, res) => {
  const { _id } = req.params
  User.findOneAndRemove({ _id })
  .then(doc => {
    res.send(doc)
  })
  .catch(error => {
    console.error('User adminRemove()', error)
    res.status(400).send({ error: 'user delete failed' })
  })
}
