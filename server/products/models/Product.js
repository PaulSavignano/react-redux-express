import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  image: {
    type: String,
    default: 'http://placehold.it/1000x1000'
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
