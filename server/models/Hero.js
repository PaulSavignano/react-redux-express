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
    width: { type: Number, trim: true, default: 333 },
    height: { type: Number, trim: true, default: 188 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  values: {
    backgroundColor: { type: String, trim: true },
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    pText: { type: String, trim: true, default: '<p>Paragraph</p>' }
  }
}, {
  timestamps: true
})

HeroSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
})

HeroSchema.post('remove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src }).catch(err => console.error(err))
  }
})

const Hero = mongoose.model('Hero', HeroSchema)

export default Hero
