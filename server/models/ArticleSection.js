import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const ArticleSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
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
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    mediaAlign: { type: String, trim: true, default: 'right' },
    mediaBorder: { type: String, trim: true },
    mediaFlex: { type: String, trim: true, default: '1 1 auto' },
    pText: { type: String, trim: true, default: '<p>Paragraph</p>' },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})


ArticleSectionSchema.pre('remove', function(next) {
  if (this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  next()
})

const ArticleSection = mongoose.model('ArticleSection', ArticleSectionSchema)

export default ArticleSection
