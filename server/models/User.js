import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ObjectID } from 'mongodb'

import Address from './Address'
import Order from './Order'

const UserSchema = new Schema({
  addresses: [{ type: Schema.ObjectId, ref: 'Address' }],
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandName: { type: String, maxlength: 25 },
  password: { type: String, required: true, maxlength: 500, minlength: 6 },
  passwordResetExpires: { type: Date },
  passwordResetToken: { type: String, default: '' },
  roles: {
    type: [{ type: String, enum: ['admin', 'master', 'owner', 'user'], maxlength: 25 }],
    default: ['user']
  },
  values: {
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      minlength: 1,
      unique: true,
      lowercase: true,
      validate: {
        validator: value => validator.isEmail(value),
        message: '{VALUE} is not a valid email'
      }
    },
    firstName: { type: String, trim: true, maxlength: 100, minlength: 1, required: true },
    lastName: { type: String, trim: true, maxlength: 100, minlength: 1, required: true },
    phone: { type: String, trim: true, maxlength: 50, minlength: 1 },
  }
}, {
  timestamps: true
})

function autopopulate(next) {
  this.populate({ path: 'addresses', select: '-user' })
  next()
}

UserSchema.pre('find', autopopulate)
UserSchema.pre('findOne', autopopulate)

UserSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  const { _id, addresses, roles, values } = userObject
  return { _id, addresses, roles, values }
}


UserSchema.statics.findByCredentials = function(email, password) {
  const User = this
  return User.findOne({ 'values.email': email.toLowerCase() })
  .populate({ path: 'addresses' })
  .then(user => {
    if (!user) return Promise.reject({ email: 'User not found' })
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password)
      .then(res => {
        if (res) {
          resolve(user)
        } else {
          reject({ password: 'Password does not match' })
        }
      })
    })
  })
}


UserSchema.pre('save', function(next) {
  const user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})


UserSchema.post('findOneAndRemove', function(doc, next) {
  Address.deleteMany({ user: doc._id }).catch(error => console.error(error))
  next()
})

const User = mongoose.model('User', UserSchema)

export default User
