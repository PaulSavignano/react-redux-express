import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/cards/card_`

const CardSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    flex: { type: String, trim: true, default: '1 1 auto' },
    iframe: { type: String, trim: true },
    link: { type: String, trim: true },
    margin: { type: String, trim: true },
    text: { type: String, trim: true },
    width: { type: String, trim: true },
    zDepth: { type: Number, trime: true, default: 1 }
  }
}, {
  timestamps: true
})

CardSchema.pre('remove', function(next) {
  const card = this
  if (card.image) {
    const Key = `${s3Path}${card._id}`
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Card = mongoose.model('Card', CardSchema)

export default Card
