import mongoose, { Schema } from 'mongoose'

const ResetTokenSchema = new Schema({
  createdAt: { type: Date, default: Date.now, expires: '1h' },
  resetToken: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema)

export default ResetToken
