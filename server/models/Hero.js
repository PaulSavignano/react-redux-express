import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../utils/s3'

const HeroSchema = new Schema({
  backgroundImage: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1920, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 1080, max: 10000, min: 0 }
  },
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandSlug: { type: String, maxlength: 25 },
  image: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 333, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 188, max: 10000, min: 0 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true, maxlength: 100 },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    backgroundColor: { type: String, trim: true, maxlength: 50 },
    backgroundPosition: { type: String, trim: true, maxlength: 50, default: 'center center' },
    button1Text: { type: String, trim: true, maxlength: 100 },
    button1Link: { type: String, trim: true, maxlength: 100 },
    button2Text: { type: String, trim: true, maxlength: 100 },
    button2Link: { type: String, trim: true, maxlength: 100 },
    h1Text: { type: String, trim: true, default: 'Heading 1', maxlength: 100 },
    h2Text: { type: String, trim: true, default: 'Heading 2', maxlength: 100 },
    h3Text: { type: String, trim: true, default: 'Heading 3', maxlength: 100 },
    iframe: { type: String, trim: true, maxlength: 150 },
    mediaBorder: { type: String, trim: true, maxlength: 50 },
    mediaBorderRadius: { type: String, trim: true, maxlength: 50 },
    mediaElevation: { type: Number, trim: true, max: 24, min: 0 },
    mediaFlex: { type: String, trim: true, maxlength: 50 },
    pText: { type: String, trim: true, default: '<p>Paragraph</p>', maxlength: 1000 }
  }
}, {
  timestamps: true
})

HeroSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

HeroSchema.post('remove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

const Hero = mongoose.model('Hero', HeroSchema)

export default Hero
