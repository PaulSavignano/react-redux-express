import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const ProductSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  items: [{ type: Schema.ObjectId, ref: 'Product' }],
  values: {
    backgroundColor: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})

ProductSectionSchema.post('save', function(doc) {
  this.model('Page').update(
    { _id: this.page },
    { $push: {
      sections: {
        kind: 'ProductSection',
        section: this._id
      }
    }},
    { new: true }
  )
})

ProductSectionSchema.pre('remove', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.model('Product').remove({ _id: { $in: this.products }})
  next()
})

const ProductSection = mongoose.model('ProductSection', ProductSectionSchema)

export default ProductSection
