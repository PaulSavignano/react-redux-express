import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cart: { type: Object, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  state: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
