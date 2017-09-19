import mongoose, { Schema } from 'mongoose'

import Section from './Section'

const PageSchema = new Schema({
  slug: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  values: {
    name: { type: String, trim: true, minlength: 1 }
  },
}, {
  timestamps: true
})

function autopopulate(next) {
  this.populate({
    path: 'sections',
    populate: { path: 'items.item' }
  })
  next();
}

PageSchema.pre('find', autopopulate)
PageSchema.pre('findOne', autopopulate)

PageSchema.post('findOneAndRemove', function(doc, next) {
  doc.sections.forEach(section => {
    return Section.findOneAndRemove({ _id: section })
    .catch(error => console.log(error))
  })
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
