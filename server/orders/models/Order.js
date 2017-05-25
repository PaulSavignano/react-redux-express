import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  paymentId: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  shipTo: {
    fullName: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  cart: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
