import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const SwipeableViewSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  swipeableSection: { type: Schema.ObjectId, ref: 'SwipeableSection' },
  image: {
    src: { type: String },
    width: { type: Number, trim: true, default: 1920 },
    height: { type: Number, trim: true, default: 1080 }
  },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  },
  kind: { type: String }
}, {
  timestamps: true
})

SwipeableViewSchema.post('save', function(next) {
  this.model('SwipeableSection').update(
    { _id: this.swipeableSection },
    { $push: { swipeableViews: this._id }},
    { new: true }
  )
  next()
})

SwipeableViewSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('SwipeableSection').update(
    { _id: this.swipeableSection },
    { $pull: { swipeableViews: this._id }},
    { multi: true }
  )
  next()
})

const SwipeableView = mongoose.model('SwipeableView', SwipeableViewSchema)

export default SwipeableView
