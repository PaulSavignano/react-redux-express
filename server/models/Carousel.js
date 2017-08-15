import mongoose, { Schema } from 'mongoose'

import Page from '../models/Page'
import Section from '../models/Section'

import { deleteFiles } from '../middleware/s3'

const CarouselSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slides: [{
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
  }]
}, {
  timestamps: true
})


//  Slide.remove({ _id: { $in: { carouselId: carousel._id }}})
CarouselSchema.pre('remove', function(next) {
  const carousel = this
  const images = slides.filter(item => item.image.src).map(item => item.image.src)
  if (images.length) {
    deleteFiles(images).catch(err => console.error(err))
  }
  if (carousel.sectionId) {
    Section.findOneAndUpdate(
      { _id: carousel.sectionId },
      { $pull: { components: { componentId: carousel._id }}},
      { new: true }
    )
    .then(section => next({ carousel, section }))
    .catch(err => console.error(err))
  } else if (carousel.pageId) {
    Page.findOneAndUpdate(
      { _id: slide.sectionId },
      { $pull: { carousels: { carouselId: carousel._id }}},
      { new: true }
    )
    .then(page => next({ carousel, page }))
    .catch(err => console.error(err))
  }
  next({ carousel })
})


const Carousel = mongoose.model('Carousel', CarouselSchema)

export default Carousel
