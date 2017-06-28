import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/slides/slide_`

const SlideSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slug: { type: String },
  image: {
    src: { type: String },
    width: { type: Number },
    height: { type: Number }
  },
  values: {
    text: { type: String, trim: true }
  },
  createdAt: { type: Date, default: Date.now }
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
