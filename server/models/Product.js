import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../utils/s3'

const ProductSchema = new Schema({
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandName: { type: String, maxlength: 25 },
  image: {
    src: { type: String, minlength: 1, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1000, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 563, max: 10000, min: 0 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true, maxlength: 100 },
  productSlug: { type: String, maxlength: 100 },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    description: { type: String, minlength: 1, trim: true, maxlength: 500 },
    detail: { type: String, minlength: 1, trim: true, maxlength: 1000 },
    iframe: { type: String, minlength: 1, trim: true, maxlength: 150 },
    name: { type: String, minlength: 1, trim: true, maxlength: 50 },
    price: { type: Number, default: 0 , max: 100000, min: 0 },
  }
}, {
  timestamps: true
})

ProductSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

ProductSchema.post('remove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
