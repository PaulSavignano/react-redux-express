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
    default: 'http://placehold.it/275x250'
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
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
