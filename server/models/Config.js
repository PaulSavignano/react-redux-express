import mongoose, { Schema } from 'mongoose'

const ConfigSchema = new Schema({
  values: {
    GMAIL_USER: { type: String, trim: true, minlength: 1 },
    OAUTH_ACCESS_TOKEN: { type: String, trim: true, minlength: 1},
    OAUTH_CLIENT_ID: { type: String, trim: true, minlength: 1 },
    OAUTH_CLIENT_SECRET: { type: String, trim: true, minlength: 1 },
    OAUTH_REFRESH_TOKEN: { type: String, trim: true, minlength: 1 },
    STRIPE_PK: { type: String, trim: true, minlength: 1 },
    STRIPE_SK: { type: String, trim: true, minlength: 1 }
  }
}, {
  timestamps: true
})

const Config = mongoose.model('Config', ConfigSchema)

export default Config
