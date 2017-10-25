import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  address: {
    name: { type: String, maxlength: 100 },
    phone: { type: String, maxlength: 50 },
    street: { type: String, required: true, maxlength: 100 },
    city: { type: String, required: true, maxlength: 100 },
    state: { type: String, required: true, maxlength: 50 },
    zip: { type: String, required: true, maxlength: 50 },
  },
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandSlug: { type: String, maxlength: 25 },
  cart: { type: Object, required: true },
  email: { type: String, required: true, maxlength: 100 },
  firstName: { type: String, required: true, maxlength: 100 },
  lastName: { type: String, required: true, maxlength: 100 },
  paymentId: { type: String, required: true, maxlength: 500 },
  shipDate: { type: Date },
  shipped: { type: Boolean },
  total: { type: String, required: true, maxlength: 50 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
