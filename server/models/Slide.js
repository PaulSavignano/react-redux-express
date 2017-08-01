import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/slides/slide_`

const SlideSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  image: {
    src: { type: String },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  values: {
    mediaBackgroundColor: { type: String, trim: true, default: 'rgb(100, 100, 100)' },
    contentBackgroundColor: { type: String, trim: true, default: 'rgb(0, 0, 0)' },
    color: { type: String, trim: true },
    title: { type: String, trim: true, default: 'Title' },
    subtitle: { type: String, trim: true, default: 'Subtitle' }
  }
}, {
  timestamps: true
})

SlideSchema.pre('remove', function(next) {
  const slide = this
  if (slide.image) {
    const Key = `${s3Path}${slide._id}`
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Slide = mongoose.model('Slide', SlideSchema)

export default Slide
