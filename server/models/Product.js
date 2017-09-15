import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/products/product_`

const ProductSchema = new Schema({
  image: {
    src: { type: String, minlength: 1, trim: true },
    width: { type: Number, trim: true, default: 1000 },
    height: { type: Number, trim: true, default: 563 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  productSlug: { type: String },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    description: { type: String, minlength: 1, trim: true },
    detail: { type: String, minlength: 1, trim: true },
    iframe: { type: String, minlength: 1, trim: true },
    name: { type: String, minlength: 1, trim: true },
    price: { type: Number, default: 0 },
  }
}, {
  timestamps: true
})

ProductSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
})

ProductSchema.post('remove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
