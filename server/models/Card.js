import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../utils/s3'

const CardSchema = new Schema({
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandSlug: { type: String, maxlength: 25 },
  image: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1000, max: 10000, min: 0 },
    height: { type: Number, trim: true, default: 563, max: 10000, min: 0 }
  },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true, maxlength: 50 },
  section: { type: Schema.Types.ObjectId, ref: 'CardSection' },
  values: {
    button1Text: { type: String, trim: true, maxlength: 50 },
    button1Link: { type: String, trim: true, maxlength: 50 },
    button2Text: { type: String, trim: true, maxlength: 50 },
    button2Link: { type: String, trim: true, maxlength: 50 },
    flex: { type: String, trim: true, maxlength: 50 },
    h1Text: { type: String, trim: true, default: 'Heading 1', maxlength: 100 },
    h2Text: { type: String, trim: true, default: 'Heading 2', maxlength: 100 },
    h3Text: { type: String, trim: true, default: 'Heading 3', maxlength: 100 },
    iframe: { type: String, trim: true, maxlength: 50 },
    link: { type: String, trim: true, maxlength: 50 },
    pText: { type: String, time: true, default: '<p>Paragraph</p>', maxlength: 1000 },
  }
}, {
  timestamps: true
})

CardSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

const Card = mongoose.model('Card', CardSchema)

export default Card
