import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const AdminSchema = new Schema({
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

AdminSchema.methods.toJSON = function() {
  const admin = this
  const adminObject = admin.toObject()
  const { _id, email } = adminObject
  return { _id, email }
}

AdminSchema.methods.generateAuthToken = function() {
  const admin = this
  const access = 'auth'
  const token = jwt.sign({ _id: admin._id.toHexString(), access }, 'abc123').toString()
  admin.tokens.push({ access, token })
  return admin.save()
    .then(() => {
      return token
    })
}

const AdminModel = mongoose.model('AdminModel', AdminSchema)

export default AdminModel
