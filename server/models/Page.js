import mongoose, { Schema } from 'mongoose'

import CardSection from './CardSection'

const PageSchema = new Schema({
  slug: { type: String },
  sections: [{
    kind: { type: String },
    section: { type: Schema.ObjectId, refPath: 'sections.kind' }
  }],
  values: {
    name: { type: String, trim: true, minlength: 1 }
  },
}, {
  timestamps: true
})

function autopopulate(next) {
  this.populate({
    path: 'sections.section',
    populate: [
      { path: 'items', model: 'Card' },
    ]
  })
  next();
}

PageSchema.pre('find', autopopulate)
PageSchema.pre('findOne', autopopulate)

PageSchema.pre('remove', function(next) {
  this.model('sections.section').remove({ _id: { $in: this.sections.section }})
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
