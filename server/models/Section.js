import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'
import Card from './Card'
import Product from './Product'
import Slide from './Slide'

const s3Path = `${process.env.APP_NAME}/sections/section_`

const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  slug: { type: String },
  order: { type: Number },
  image: {
    src: { type: String },
    width: { type: Number },
    height: { type: Number },
  },
  values: {
    height: { type: Number },
    backgroundColor: { type: String, trim: true },
    backgroundAttachment: { type: String, trim: true },
    text: { type: String },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    flexFlow: { type: String, trim: true }
  },
  components: [{
    componentId: { type: Schema.Types.ObjectId, refPath: 'components.type' },
    type: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
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
      case 'Product':
        Product.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.error(err))))
        break
      case 'Slide':
        Slide.find({ sectionId: section._id })
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
