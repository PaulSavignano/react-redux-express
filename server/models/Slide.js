import mongoose, { Schema } from 'mongoose'

import Carousel from '../models/Carousel'
import { deleteFile } from '../middleware/s3'

const SlideSchema = new Schema({
  carouselId: { type: Schema.Types.ObjectId, ref: 'Carousel' },
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
  if (slide.image && slide.image.src) {
    deleteFile({ Key: slide.image.src }).catch(err => console.error(err))
  }
  Carousel.findOneAndUpdate(
    { _id: slide.carouselId },
    { $pull: { slides: { slideId: slide._id }}},
    { new: true }
  )
  .then(carousel => next({ carousel, slide }))
  .catch(err => console.error(err))
})

const Slide = mongoose.model('Slide', SlideSchema)

export default Slide
