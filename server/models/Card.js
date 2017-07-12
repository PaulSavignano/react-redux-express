import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/cards/card_`

const CardSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slug: { type: String },
  image: {
    src: { type: String },
    width: { type: Number },
    height: { type: Number }
  },
  values: {
    width: { type: Number },
    maxWidth: { type: Number },
    zDepth: { type: Number, default: 1 },
    margin: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    iFrame: { type: String, trim: true },
    text: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now }
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
