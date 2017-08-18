import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const HeroSchema = new Schema({
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    button1Content: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Content: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    h1Content: { type: String, trim: true, default: 'Heading 1' },
    h2Content: { type: String, trim: true, default: 'Heading 2' },
    h3Content: { type: String, trim: true, default: 'Heading 3' },
    pContent: { type: String, time: true, default: '<p>Paragraph</p>' }
  }
}, {
  timestamps: true
})

HeroSchema.pre('remove', function(next) {
  const card = this
  if (card.image.src) {
    deleteFile({ Key: card.image.src }).catch(err => console.error(err))
  }
  next()
})

const Card = mongoose.model('Card', HeroSchema)

export default Card
