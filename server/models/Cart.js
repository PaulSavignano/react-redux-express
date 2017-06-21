import mongoose, { Schema } from 'mongoose'

const CartSchema = new Schema({
  total: { type: Number },
  subTotal: { type: Number },
  tax: { type: Number, default: .075 },
  quantity: { type: Number },
  items: [{
    productId: { type: Schema.Types.ObjectId, required: true },
    productQty: { type: Number, required: true },
    image: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number }
  }],
  createdAt: { type: Date, default: Date.now }
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart
