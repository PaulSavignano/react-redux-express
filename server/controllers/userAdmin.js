import { ObjectID } from 'mongodb'
import crypto from 'crypto'
import fetch from 'node-fetch'

import Address from '../models/Address'
import Brand from '../models/Brand'
import Order from '../models/Order'
import User from '../models/User'
import { sendEmail1 } from '../middleware/nodemailer'

export const adminAdd = (req, res) => {
  const { user } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
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
  const { user } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'unauthorized'})
  User.find({})
  .then(users => res.send(users))
  .catch(error => {
    console.log(error)
    res.status(400).send({ error })
  })
}

export const adminUpdate = (req, res) => {
  const {
    user,
    params: { _id },
    body: { values, type }
  } = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
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
          .catch(error => {
            console.error({ error })
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.log({ error })
          res.status(400).send({ error })
        })
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
        .catch(error => {
          console.log({ error })
          res.status(400).send({ error })
        })
    default:
      return
  }
}

export const adminRemove = (req, res) => {
  console.log('adminremove')
  const { user, params: { _id }} = req
  const isOwner = user.roles.some(role => role === 'owner')
  if (!isOwner) return res.status(400).send({ error: 'umauthorized'})
  User.findOneAndRemove({ _id })
  .then(doc => {
    res.send(doc)
  })
  .catch(error => {
    console.error('User adminRemove()', error)
    res.status(400).send({ error: 'user delete failed' })
  })
}
