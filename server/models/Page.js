import mongoose, { Schema } from 'mongoose'

import Section from './Section'

const PageSchema = new Schema({
  slug: { type: String },
  sections: [{
    section: { type: Schema.ObjectId, ref: 'Section' }
  }],
  values: {
    name: { type: String, trim: true, minlength: 1 }
  },
}, {
  timestamps: true
})

function autopopulate(next) {
  const page = this
  page.populate('sections.section')
  next();
}

PageSchema.pre('find', autopopulate)
PageSchema.pre('findOne', autopopulate)

PageSchema.pre('remove', function(next) {
  const page = this
  if (page.sections.length) {
    Section.remove({ _id: { $in: sections.sectionId }})
  }
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
