import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const HeroSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  backgroundImage: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  values: {
    backgroundColor: { type: String, trim: true },
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    flex: { type: String, trim: true, default: '1 1 auto' },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    mediaBorder: { type: String, trim: true },
    mediaFlex: { type: String, trim: true, default: '1 1 auto' },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

HeroSchema.post('save', function(doc) {
  this.model('Section').update(
    { _id: doc.section },
    { $push: { items: { kind: 'Hero', item: doc._id }}},
    { new: true }
  )
})

HeroSchema.pre('remove', function(next) {
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

const Hero = mongoose.model('Hero', HeroSchema)

export default Hero
