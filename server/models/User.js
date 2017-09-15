import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Address from '../models/Address'
import Order from '../models/Order'

const UserSchema = new Schema({
  values: {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      lowercase: true,
      validate: {
        validator: value => validator.isEmail(value),
        message: '{VALUE} is not a valid email'
      }
    },
    firstName: { type: String, trim: true, minlength: 1, required: true },
    lastName: { type: String, trim: true, minlength: 1, required: true },
    phone: { type: String, trim: true, minlength: 1 },
  },
  addresses: [{ type: Schema.ObjectId, ref: 'Address' }],
  password: { type: String, required: true, minlength: 6 },
  roles: {
    type: [{ type: String, enum: ['admin', 'owner', 'user'] }],
    default: ['user']
  },
  tokens: [{
    createdAt: { type: Date, default: Date.now },
    access: { type: String, required: true },
    token: { type: String, required: true }
  }],
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
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

UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()
  user.tokens.push({ access, token })
  return user.save()
    .then(() => token)
    .catch(err => Promise.reject(err))
}

UserSchema.methods.removeToken = function(token) {
  const user = this
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  })
}

UserSchema.methods.removeTokens = function(tokens) {
  const user = this
  return user.update({
    $pull: {
      tokens: {
        $in: tokens
      }
    }
  })
}

UserSchema.methods.buildResponse = function() {
  const user = this
  this.populate({ path: 'addresses' })
  const { _id, addresses, roles, values } = user
  const isOwner = roles.some(role => role === 'owner')
  const isAdmin = roles.some(role => role === 'admin')
  if (isAdmin) {
    return Promise.all([
      User.find({}).sort({ 'values.lastName': 1, 'values.firstName': 1 }).then(users => users)
    ])
    .then(([users]) => {
      return {
        user: { _id, addresses, roles, values },
        users: users
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send()
    })
  } else {
    return Promise.resolve({ user: { _id, addresses, values, roles }})
  }
}

UserSchema.statics.findByToken = function(token, roles) {
  const User = this
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return Promise.reject(error)
  }
  return User.findOne({
    _id: decoded._id,
    roles: {
      $in: roles
    },
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this
  return User.findOne({ 'values.email': email.toLowerCase() })
    .then(user => {
      if (!user) return Promise.reject({ error: { email: 'User not found'}})
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) {
            resolve(user)
          } else {
            reject({ error: { password: 'Password does not match' }})
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
  Address.deleteMany({ _id: { $in: doc.addresses }}).catch(error => console.error(error))
  next()
})

const User = mongoose.model('User', UserSchema)

export default User
