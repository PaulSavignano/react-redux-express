import mongoose, { Schema } from 'mongoose'

import Section from './Section'

const PageSchema = new Schema({
  name: { type: String, trim: true, minlength: 1 },
  slug: { type: String },
  sections: [{
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  }]
}, {
  timestamps: true
})

PageSchema.pre('remove', function(next) {
  const page = this
  if (page.sections.length) {
    Section.find({ pageId: page._id })
      .then(items => items.map(item => item.remove()
      .catch(err => console.error(err))
    ))
  }
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
