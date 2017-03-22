import mongoose, { Schema } from 'mongoose'

const CartSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    minlength: 1,
    trim: true
  },
  productQty: {
    type: Number,
    minlength: 1,
    trim: true
  }
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart
