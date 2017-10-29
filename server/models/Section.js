import mongoose, { Schema } from 'mongoose'

import Article from './Article'
import Card from './Card'
import ContactForm from './ContactForm'
import Hero from './Hero'
import Product from './Product'

import { deleteFile } from '../utils/s3'

const SectionSchema = new Schema({
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandName: { type: String, maxlength: 25 },
  backgroundImage: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1920, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 1080, max: 10000, min: 0 }
  },
  items: [{
    kind: { type: String, trim: true },
    item: { type: Schema.ObjectId, refPath: 'items.kind' }
  }],
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true, maxlength: 100 },
  values: {
    alignItems: { type: String, trim: true, maxlength: 50 },
    backgroundColor: { type: String, trim: true, maxlength: 50 },
    backgroundPosition: { type: String, trim: true, maxlength: 50 },
    flexFlow: { type: String, trim: true, default: 'row wrap', maxlength: 50 },
    justifyContent: { type: String, trim: true, default: 'space-between', maxlength: 50 },
    kind: { type: String, trim: true, default: 'Flex', maxlength: 50 },
    margin: { type: String, trim: true, default: '0 auto', maxlength: 50 },
    maxWidth: { type: String, trim: true, default: '1044px', maxlength: 50 },
    minHeight: { type: String, trim: true, default: '120px', maxlength: 50 },
    padding: { type: String, trim: true, maxlength: 50 },
    pageLink: { type: String, trim: true, maxlength: 50 },
  }
}, {
  timestamps: true
})


SectionSchema.post('findOneAndRemove', function(doc, next) {
  if (doc.backgroundImage && doc.backgroundImage.src) {
    deleteFile({ Key: doc.backgroundImage.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
  doc.items.forEach(item => {
    switch(item.kind) {
      case 'Article':
        return Article.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      case 'Card':
        return Card.findOneAndRemove({ _id: item.item })
        .catch(error => console.error({ error }))
      case 'ContactForm':
        return ContactForm.findOneAndRemove({ _id: item.item })
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
