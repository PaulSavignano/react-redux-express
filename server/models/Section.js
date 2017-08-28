import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const SectionSchema = new Schema({
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  items: [{
    kind: { type: String, trim: true },
    item: { type: Schema.ObjectId, refPath: 'items.kind' }
  }],
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  values: {
    alignItems: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    containerMarginTop: { type: String, trim: true },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    justifyContent: { type: String, trim: true, default: 'space-between' },
    kind: { type: String, trim: true, default: 'Flex' },
    margin: { type: String, trim: true, default: '0 auto' },
    maxWidth: { type: String, trim: true, default: '1044px' },
    minHeight: { type: String, trim: true, default: '72px' },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})


SectionSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.items.forEach(item => {
    switch(item.kind) {
      case 'Article':
        return Article.remove({ _id: { $in: this.items.item }})
        .catch(error => console.error({ error }))
      case 'Card':
        return Card.remove({ _id: { $in: this.items.item }})
        .catch(error => console.error({ error }))
      case 'Hero':
        return Hero.remove({ _id: { $in: this.items.item }})
        .catch(error => console.error({ error }))
      case 'Product':
        return Product.remove({ _id: { $in: this.items.item }})
        .catch(error => console.error({ error }))
      default:
        return
    }
  })
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
