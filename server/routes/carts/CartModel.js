import mongoose from 'mongoose'

const CartModel = mongoose.model('CartModel', {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
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

export default CartModel
