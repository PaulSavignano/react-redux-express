import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/products/product_`

const ProductSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slug: { type: String },
  values: {
    name: { type: String, minlength: 1, trim: true },
    description: { type: String, minlength: 1, trim: true },
    price: { type: Number, default: 0 }
  },
  image: {
    src: { type: String, minlength: 1, trim: true },
    width: { type: Number },
    height: { type: Number },
  },
  slug: { type: String },
  createdAt: { type: Date, default: Date.now }
})

ProductSchema.pre('remove', function(next) {
  const product = this
  if (product.image.src) {
    const Key = `${s3Path}${product._id}`
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
