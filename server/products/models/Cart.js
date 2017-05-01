import mongoose, { Schema } from 'mongoose'

const CartSchema = new Schema({
  total: {
    type: Number,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: Number,
    minlength: 1,
    trim: true
  },
  items: [{
    productId: { type: Schema.Types.ObjectId, required: true },
    productQty: { type: Number, required: true },
    image: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart
