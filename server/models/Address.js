import mongoose, { Schema } from 'mongoose'

const AddressSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  values: {
    name: { type: String, trim: true, minlength: 1, maxlength: 50 },
    phone: { type: String, trim: true, minlength: 1, maxlength: 20 },
    street: { type: String, trim: true, minlength: 1, maxlength: 50 },
    city: { type: String, trim: true, minlength: 1, maxlength: 50 },
    zip: { type: String, trim: true, minlength: 1, maxlength: 12 },
    state: { type: String, trim: true, minlength: 1, maxlength: 6 }
  }
}, {
  timestamps: true
})

const Address = mongoose.model('Address', AddressSchema)

export default Address
