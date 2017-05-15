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
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    firstname: {
      type: String,
      trim: true,
      minlength: 1
    },
    lastname: {
      type: String,
      trim: true,
      minlength: 1
    },
    address: {
      type: String,
      trim: true,
      minlength: 1
    },
    zip: {
      type: Number,
      minlength: 1
    },
    state: {
      type: String,
      minlength: 1
    }
  },
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
  passwordResetExpires: { type: Date, default: Date.now }
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
    .then(() =>  {
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
  return User.findOne({ 'values.email': email })
    .then(user => {
      if (!user) {
        return Promise.reject({
          error: { email: 'User not found'}
        })
      }
      return bcrypt.compare(password, user.password)
        .then(res => {
          return user
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
