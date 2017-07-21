import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/slides/slide_`

const SlideSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slug: { type: String },
  image: {
    src: { type: String },
    width: { type: Number, trim: true, default: 300 },
    height: { type: Number, trim: true, default: 200 }
  },
  values: {
    color: { type: String, trim: true, default: 'inherit' },
    text: { type: String, trim: true },
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
