import mongoose, { Schema } from 'mongoose'

const AccessTokenSchema = new Schema({
  createdAt: { type: Date, expires: '24h' },
  token: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema)

export default AccessToken
