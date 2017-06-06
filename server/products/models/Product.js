import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    name: {
      type: String,
      minlength: 1,
      trim: true
    },
    description: {
      type: String,
      minlength: 1,
      trim: true
    },
    price: { type: Number, default: 0 }
  },
  image: { type: String },
  slug: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
