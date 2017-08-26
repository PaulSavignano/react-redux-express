import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const SectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  items: [{
    kind: { type: String, trim: true },
    item: { type: Schema.ObjectId, refPath: 'items.kind' }
  }],
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  values: {
    backgroundColor: { type: String, trim: true },
    maxWidth: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})

SectionSchema.post('save', function(doc) {
  this.model('Page').update(
    { _id: doc.page },
    { $push: { sections: doc._id }},
    { new: true }
  )
})

SectionSchema.pre('remove', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.items.forEach(item => {
    switch(item.kind) {
      case 'Article':
        return Article.remove({ _id: { $in: this.items.item }})
        .catch(err => console.error(err))
      case 'Card':
        return Card.remove({ _id: { $in: this.items.item }})
        .catch(err => console.error(err))
      case 'Hero':
        return Hero.remove({ _id: { $in: this.items.item }})
        .catch(err => console.error(err))
      case 'Product':
        return Product.remove({ _id: { $in: this.items.item }})
        .catch(err => console.error(err))
      case 'View':
        return View.remove({ _id: { $in: this.items.item }})
        .catch(err => console.error(err))
      default:
        return
    }
  })
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
