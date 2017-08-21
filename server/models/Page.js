import mongoose, { Schema } from 'mongoose'

import Section from './Section'
import Article from './Article'
import Card from './Card'
import Carousel from './Carousel'
import Iframe from './Iframe'
import Image from './Image'
import Product from './Product'
import Text from './Text'
import Title from './Title'

const PageSchema = new Schema({
  name: { type: String, trim: true, minlength: 1 },
  slug: { type: String },
  sections: [{
    section: { type: Schema.ObjectId, ref: 'Section' }
  }]
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
