import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const CardSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: 'CardSection' },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  page: { type: Schema.ObjectId, ref: 'Page' },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    link: { type: String, trim: true },
    mediaBorder: { type: String, trim: true },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

CardSchema.post('save', function(doc) {
  this.model('CardSection').update(
    { _id: this.cardSection },
    { $push: { cards: this._id }},
    { new: true }
  )
})

CardSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('CardSection').update(
    { _id: this.cardSection },
    { $pull: { cards: this._id }},
    { multi: true }
  )
  next()
})

const Card = mongoose.model('Card', CardSchema)

export default Card
