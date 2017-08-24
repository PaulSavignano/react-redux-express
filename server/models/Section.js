import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'
import Article from './Article'
import Card from './Card'
import Carousel from './Carousel'
import Hero from './Hero'
import Page from './Page'
import Product from './Product'

const s3Path = `${process.env.APP_NAME}/sections/section_`

const SectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
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
    maxWidth: { type: String, trim: true },
    minHeight: { type: String, trim: true, default: '64px' },
    padding: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  },
  components: [{
    kind: { type: String },
    component: { type: Schema.ObjectId, refPath: 'components.kind' }
  }]
}, {
  timestamps: true
})

SectionSchema.post('save', function(next) {
  this.model('Page').update(
    { _id: this.page._id },
    { $push: { sections: this._id }},
    { new: true }
  )
  next()
})

SectionSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('Page').update(
    { sections: { $in: this._id }},
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.model('Swipeable').remove({ _id: { $in: this.swipeables._id }})
  next()
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
