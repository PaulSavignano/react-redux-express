import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const ArticleSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  section: { type: Schema.ObjectId, ref: 'Section' },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    flex: { type: String, trim: true, default: '1 1 auto' },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    mediaAlign: { type: String, trim: true, default: 'right' },
    mediaBorder: { type: String, trim: true },
    mediaFlex: { type: String, trim: true, default: '1 1 auto' },
    pText: { type: String, trim: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})


ArticleSchema.post('save', function(doc) {
  this.model('Section').update(
    { _id: doc.section },
    { $push: { items: { kind: 'Article', item: doc._id }}},
    { new: true }
  )
})

ArticleSchema.pre('remove', function(next) {
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

const Article = mongoose.model('Article', ArticleSchema)

export default Article
