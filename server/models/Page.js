import mongoose, { Schema } from 'mongoose'

import Section from './Section'
import { deleteFile } from '../utils/s3'

const PageSchema = new Schema({
  backgroundImage: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1920, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 1080, max: 10000, min: 0 }
  },
  hostname: { type: String, maxlength: 90, required: true, },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  slug: { type: String },
  values: {
    name: { type: String, trim: true, minlength: 1, maxlength: 1000 },
    backgroundColor: { type: String, trim: true, minlength: 1, default: 'rgb(255,255,255)', maxlength: 50 },
    backgroundPosition: { type: String, trim: true, maxlength: 50 }
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
  if (doc.backgroundImage && doc.backgroundImage.src) {
    deleteFile({ Key: doc.backgroundImage.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
  doc.sections.forEach(section => {
    return Section.findOneAndRemove({ _id: section })
    .catch(error => console.log(error))
  })
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
