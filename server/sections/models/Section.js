import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../../middleware/s3'
import Card from '../../cards/models/Card'
import Carousel from '../../carousels/models/Carousel'
import Product from '../../products/models/Product'

const s3Path = `${process.env.APP_NAME}/sections/section_`

const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageName: { type: String },
  order: { type: Number },
  image: { type: String },
  values: {
    height: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    backgroundAttachment: { type: String, trim: true },
    title: { type: String, trim: true },
    titleAlign: { type: String, trim: true },
    text: { type: String, trim: true },
    textAlign: { type: String, trim: true },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    color: { type: String, trim: true }
  },
  componentType: { type: String },
  components: [{
    cardId: { type: Schema.Types.ObjectId, ref: 'Card' },
    createdAt: { type: Date, default: Date.now }
  }, {
    carouselId: { type: Schema.Types.ObjectId, ref: 'Carousel' },
    createdAt: { type: Date, default: Date.now }
  }, {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

SectionSchema.pre('remove', function(next) {
  const section = this
  if (section.image) {
    const Key = `${s3Path}${section._id}`
    deleteFile({ Key }).catch(err => console.log(err))
  }
  if (section.componentType) {
    switch(section.componentType) {
      case 'Card':
        Card.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.log(err))))
        break
      case 'Carousel':
        Carousel.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.log(err))))
        break
      case 'Product':
        Product.find({ sectionId: section._id })
          .then(items => items.map(item => item.remove().catch(err => console.log(err))))
        break
      default:
        return
    }
  }
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
