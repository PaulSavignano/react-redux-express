import mongoose from 'mongoose'

const Product = mongoose.model('Product', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  price: {
    type: Number,
    default: null
  }
})

export default Product
