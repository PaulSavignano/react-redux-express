import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../utils/s3'

const ArticleSchema = new Schema({
  brand: { type: Schema.ObjectId, ref: 'Brand' },
  brandSlug: { type: String, maxlength: 25 },
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true, maxlength: 25 },
  image: {
    src: { type: String, trim: true, maxlength: 150 },
    width: { type: Number, trim: true, default: 1000, max: 10000 },
    height: { type: Number, trim: true, default: 563, max: 10000 }
  },
  section: { type: Schema.ObjectId, ref: 'Section' },
  values: {
    articleFlex: { type: String, trim: true, default: '1 1 auto', maxlength: 15 },
    button1Text: { type: String, trim: true, maxlength: 50 },
    button1Link: { type: String, trim: true, maxlength: 50 },
    button2Text: { type: String, trim: true, maxlength: 50 },
    button2Link: { type: String, trim: true, maxlength: 50 },
    flexFlow: { type: String, trim: true, default: 'row wrap', maxlength: 15 },
    h1Text: { type: String, trim: true, default: 'Heading 1', maxlength: 500 },
    h2Text: { type: String, trim: true, default: 'Heading 2', maxlength: 500 },
    h3Text: { type: String, trim: true, default: 'Heading 3', maxlength: 500 },
    iframe: { type: String, trim: true, maxlength: 150 },
    mediaAlign: { type: String, trim: true, default: 'leftOfText',  maxlength: 25 },
    mediaFlex: { type: String, trim: true, default: '1 1 auto', maxlength: 15 },
    mediaBorder: { type: String, trim: true, maxlength: 25 },
    mediaBorderRadius: { type: String, trim: true, maxlength: 25 },
    mediaElevation: { type: String, trim: true, default: 'articleStyle', maxlength: 25 },
    pText: { type: String, trim: true, default: '<p>Paragraph</p>', maxlength: 5000 },
    textFlex: { type: String, trim: true, default: '1 1 500px', maxlength: 15 },
  }
}, {
  timestamps: true
})


ArticleSchema.post('findOneAndRemove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

ArticleSchema.post('remove', function(doc) {
  if (doc.image && doc.image.src) {
    deleteFile({ Key: doc.image.src })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article
