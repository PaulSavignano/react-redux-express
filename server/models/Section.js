import mongoose, { Schema } from 'mongoose'

import Article from './Article'
import Card from './Card'
import Hero from './Hero'
import Product from './Product'

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
    containerBackgroundColor: { type: String, trim: true },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    justifyContent: { type: String, trim: true, default: 'space-between' },
    kind: { type: String, trim: true, default: 'Flex' },
    margin: { type: String, trim: true, default: '0 auto' },
    maxWidth: { type: String, trim: true, default: '1044px' },
    minHeight: { type: String, trim: true, default: '120px' },
    padding: { type: String, trim: true },
    pageLink: { type: String, trim: true },
  }
}, {
  timestamps: true
})


SectionSchema.post('findOneAndRemove', function(doc, next) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
  doc.items.forEach(item => {
    switch(item.kind) {
      case 'Article':
        return Article.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      case 'Card':
        return Card.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      case 'Hero':
        return Hero.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      case 'Product':
        return Product.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      default:
        return
    }
  })
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
