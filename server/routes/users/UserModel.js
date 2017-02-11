import mongoose from 'mongoose'

const UserModel = mongoose.model('UserModel', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

export default UserModel
