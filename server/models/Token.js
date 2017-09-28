import mongoose, { Schema } from 'mongoose'

import User from '../models/User'

const UserSchema = new Schema({
  createdAt: { type: Date, default: Date.now, expires: 60*60*72 },
  access: { type: String, required: true },
  token: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const Token = mongoose.model('Token', UserSchema)

export default Token
