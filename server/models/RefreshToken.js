import mongoose, { Schema } from 'mongoose'

const RefreshTokenSchema = new Schema({
  createdAt: { type: Date, expires: '7d' },
  token: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
}, {
  timestamps: true
})

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

export default RefreshToken
