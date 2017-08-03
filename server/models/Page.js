import mongoose, { Schema } from 'mongoose'

import Section from './Section'
import Slide from './Slide'

const PageSchema = new Schema({
  name: { type: String, trim: true, minlength: 1 },
  slug: { type: String },
  sections: [{
    sectionId: { type: Schema.Types.ObjectId },
  }],
  slides: [{
    slideId: { type: Schema.Types.ObjectId }
  }]
}, {
  timestamps: true
})

PageSchema.pre('remove', function(next) {
  const page = this
  if (page.sections.length) {
    Section.find({ pageId: page._id })
      .then(items => items.map(item => item.remove().catch(err => console.error(err))))
  }
  if (page.slides.length) {
    Slide.find({ pageId: page._id })
      .then(items => items.map(item => item.remove().catch(err => console.error(err))))
  }
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
