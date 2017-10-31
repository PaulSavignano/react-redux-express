import mongoose, { Schema } from 'mongoose'

const AccessTokenSchema = new Schema({
  accessToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' },
  hostname: { type: String, maxlength: 90, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema)

export default AccessToken
