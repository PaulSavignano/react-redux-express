import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  paymentId: { type: String, required: true, maxlength: 500 },
  total: { type: String, required: true, maxlength: 50 },
  firstName: { type: String, required: true, maxlength: 100 },
  lastName: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  shipped: { type: Boolean },
  shipDate: { type: Date },
  address: {
    name: { type: String, maxlength: 100 },
    phone: { type: String, maxlength: 50 },
    street: { type: String, required: true, maxlength: 100 },
    city: { type: String, required: true, maxlength: 100 },
    state: { type: String, required: true, maxlength: 50 },
    zip: { type: String, required: true, maxlength: 50 },
  },
  cart: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
