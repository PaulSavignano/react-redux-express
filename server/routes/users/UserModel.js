import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  const { _id, email } = userObject
  return { _id, email }
}

UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()
  user.tokens.push({ access, token })
  return user.save()
    .then(() => {
      return token
    })
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

UserSchema.statics.findByToken = function(token) {
  const UserModel = this
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return Promise.reject()
  }
  return UserModel.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this
  return UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject()
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user)
          } else {
            reject()
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

const UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel
