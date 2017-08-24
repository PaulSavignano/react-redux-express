import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/products/product_`

const ProductSchema = new Schema({
  image: {
    src: { type: String, minlength: 1, trim: true },
    width: { type: Number, trim: true, default: 1012 },
    height: { type: Number, trim: true, default: 675 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  productSlug: { type: String },
  productSection: { type: Schema.Types.ObjectId, ref: 'ProductSection' },
  values: {
    description: { type: String, minlength: 1, trim: true },
    detail: { type: String },
    name: { type: String, minlength: 1, trim: true },
    price: { type: Number, default: 0 },
  }
}, {
  timestamps: true
})

ProductSchema.post('save', function(next) {
  this.model('ProductSection').update(
    { _id: this.productSection },
    { $push: { products: this._id }},
    { new: true }
  )
  next()
})

ProductSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('ProductSection').update(
    { _id: this.productSection },
    { $pull: { products: this._id }},
    { multi: true }
  )
  next()
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
