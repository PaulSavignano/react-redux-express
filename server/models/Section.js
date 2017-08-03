import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'
import Card from './Card'
import Iframe from './Iframe'
import Image from './Image'
import Product from './Product'
import Text from './Text'
import Title from './Title'

const s3Path = `${process.env.APP_NAME}/sections/section_`

const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  index: { type: Number },
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
    minHeight: { type: String, trim: true, default: '300px' },
    padding: { type: String, trim: true, default: '8px' }
  },
  components: [{
    componentId: { type: Schema.Types.ObjectId, refPath: 'components.type' },
    index: { type: Number },
    type: { type: String }
  }],
}, {
  timestamps: true
})

SectionSchema.pre('remove', function(next) {
  const section = this
  if (section.image) {
    const Key = `${s3Path}${section._id}`
    deleteFile({ Key }).catch(err => console.error(err))
  }
  section.components.map(component => {
    switch(component.type) {
      case 'Card':
        Card.find({ sectionId: section._id })
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
