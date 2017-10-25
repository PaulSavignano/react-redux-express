import mongoose, { Schema } from 'mongoose'

const AddressSchema = new Schema({
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandName: { type: String, maxlength: 25 },
  values: {
    name: { type: String, trim: true, minlength: 1, maxlength: 50 },
    phone: { type: String, trim: true, minlength: 1, maxlength: 20 },
    street: { type: String, trim: true, minlength: 1, maxlength: 50 },
    city: { type: String, trim: true, minlength: 1, maxlength: 50 },
    zip: { type: String, trim: true, minlength: 1, maxlength: 12 },
    state: { type: String, trim: true, minlength: 1, maxlength: 6 }
  },
  user: { type: Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const Address = mongoose.model('Address', AddressSchema)

export default Address
