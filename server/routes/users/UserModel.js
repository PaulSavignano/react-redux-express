import mongoose from 'mongoose'
import validator from 'validator'

const UserModel = mongoose.model('UserModel', {
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
    tokens: {
      type: String,
      required: true
    }
  }]
})

export default UserModel
