import mongoose from 'mongoose'

const CartModel = mongoose.model('CartModel', {
  productId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  }
})

export default CartModel
