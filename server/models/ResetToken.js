import mongoose, { Schema } from 'mongoose'

const ResetTokenSchema = new Schema({
  createdAt: { type: Date, default: Date.now, expires: '1h' },
  hostname: { type: String, maxlength: 90, required: true },
  resetToken: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
})

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema)

export default ResetToken
