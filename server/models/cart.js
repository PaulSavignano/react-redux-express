import mongoose from 'mongoose'

const Cart = mongoose.model('Cart', {
  productId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

export default Cart
