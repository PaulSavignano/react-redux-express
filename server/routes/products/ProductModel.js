import mongoose from 'mongoose'

const ProductModel = mongoose.model('ProductModel', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  }
})

export default ProductModel
