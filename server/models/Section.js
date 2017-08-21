import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'
import Article from './Article'
import Card from './Card'
import Carousel from './Carousel'
import Iframe from './Iframe'
import Image from './Image'
import Page from './Page'
import Product from './Product'
import Text from './Text'
import Title from './Title'

const s3Path = `${process.env.APP_NAME}/sections/section_`

const SectionSchema = new Schema({
  pageId: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  image: {
    src: { type: String },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 },
  },
  values: {
    backgroundColor: { type: String, trim: true },
    containerMarginTop: { type: String, trim: true },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    justifyContent: { type: String, trim: true, default: 'space-between' },
    alignItems: { type: String, trim: true },
    margin: { type: String, trim: true },
    minHeight: { type: String, trim: true, default: '64px' },
    padding: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  },
  components: [{
    kind: String,
    component: { type: Schema.ObjectId, refPath: 'components.kind' }
  }]
}, {
  timestamps: true
})


function autopopulate(next) {
  const section = this
  section.populate({
    path: 'components.component',
  })
  next();
}

SectionSchema.pre('find', autopopulate)
SectionSchema.pre('findOne', autopopulate)


SectionSchema.pre('remove', function(next) {
  const section = this
  if (section.image && section.image.src) {
    deleteFile({ Key: section.image.src }).catch(err => console.error(err))
  }
  section.components.forEach(component => {
    switch(component.type) {
      case 'Article':
        Article.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Card':
        Card.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Carousel':
        Carousel.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Iframe':
        Iframe.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Image':
        Image.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Product':
        Product.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Text':
        Text.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Title':
        Title.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      default:
        return
    }
  })
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
