import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
  addresses: [{
    values: {
      name: { type: String, trim: true, minlength: 1 },
      phone: { type: String, trim: true, minlength: 1 },
      street: { type: String, trim: true, minlength: 1 },
      city: { type: String, trim: true, minlength: 1 },
      zip: { type: String, trim: true, minlength: 1 },
      state: { type: String, trim: true, minlength: 1 }
    },
    createdAt: { type: Date, default: Date.now }
  }],
  password: { type: String, required: true, minlength: 6 },
  roles: {
    type: [{ type: String, enum: ['user', 'admin'] }],
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

UserSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  const { _id } = userObject
  const { email } = userObject.values
  return { _id, email }
}

UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()
  user.tokens.push({ access, token })
  return user.save()
    .then(() => token)
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

UserSchema.statics.findByToken = function(token, roles) {
  const User = this
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return Promise.reject(err)
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

const User = mongoose.model('User', UserSchema)

export default User
