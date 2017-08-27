import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const ViewSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  section: { type: Schema.ObjectId, ref: 'Section' },
  image: {
    src: { type: String },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

ViewSchema.post('save', function(doc) {
  this.model('Section').update(
    { _id: doc.section },
    { $push: { items: { kind: 'View', item: doc._id }}},
    { new: true }
  )
})

ViewSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('Section').update(
    { _id: this.section },
    { $pull: { items: this._id }},
    { multi: true }
  )
  next()
})

const View = mongoose.model('View', ViewSchema)

export default View
