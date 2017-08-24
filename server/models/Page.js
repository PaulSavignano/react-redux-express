import mongoose, { Schema } from 'mongoose'

import Section from './Section'

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
  this.populate('sections')
  next();
}

PageSchema.pre('find', autopopulate)
PageSchema.pre('findOne', autopopulate)

PageSchema.pre('remove', function(next) {
  this.model('Section').remove({ _id: { $in: this.sections._id }})
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
