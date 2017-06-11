import mongoose, { Schema } from 'mongoose'

import Section from '../../sections/models/Section'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  sections: [{
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  }],
  slug: { type: String },
  createdAt: { type: Date, default: Date.now }
})

PageSchema.pre('remove', function(next) {
  const page = this
  if (page.sections.length) {
    Section.find({ pageId: page._id })
      .then(items => items.map(item => item.remove().catch(err => console.log(err))))
  }
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
