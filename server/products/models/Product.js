import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  values: {
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
    price: { type: Number, required: true, default: 0 }
  },
  image: { type: String, default: 'https://placehold.it/1000x1000' },
  slug: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
