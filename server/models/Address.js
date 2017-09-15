import mongoose, { Schema } from 'mongoose'

const AddressSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  values: {
    name: { type: String, trim: true, minlength: 1 },
    phone: { type: String, trim: true, minlength: 1 },
    street: { type: String, trim: true, minlength: 1 },
    city: { type: String, trim: true, minlength: 1 },
    zip: { type: String, trim: true, minlength: 1 },
    state: { type: String, trim: true, minlength: 1 }
  }
}, {
  timestamps: true
})

const Address = mongoose.model('Address', AddressSchema)

export default Address
