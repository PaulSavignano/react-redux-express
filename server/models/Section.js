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


SectionSchema.post('findOneAndRemove', function(doc, next) {
  console.log('inside pre remove', doc)
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
  doc.items.forEach(item => {
    switch(item.kind) {
      case 'Article':
        Article.remove({ _id: item.item })
        .catch(error => console.error({ error }))
        break
      case 'Card':
      console.log('removing card', item.item)
        Card.remove({ _id: item.item })
        .catch(error => console.error({ error }))
        break
      case 'Hero':
        Hero.remove({ _id: item.item })
        .catch(error => console.error({ error }))
        break
      case 'Product':
        Product.remove({ _id: item.item })
        .catch(error => console.error({ error }))
        break
      default:
        return
    }
  })
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
