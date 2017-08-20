import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const CardSchema = new Schema({
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    flex: { type: String, trim: true, default: '1 1 auto' },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    link: { type: String, trim: true },
    margin: { type: String, trim: true, default: '16px' },
    mediaBorder: { type: String, trim: true },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

CardSchema.pre('remove', function(next) {
  const card = this
  if (card.image.src) {
    deleteFile({ Key: card.image.src }).catch(err => console.error(err))
  }
  next()
})

const Card = mongoose.model('Card', CardSchema)

export default Card
