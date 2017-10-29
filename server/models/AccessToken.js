import mongoose, { Schema } from 'mongoose'

const AccessTokenSchema = new Schema({
  createdAt: { type: Date, default: Date.now, expires: '24h' },
  accessToken: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema)

export default AccessToken
