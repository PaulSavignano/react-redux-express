import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const CardSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  items: [{ type: Schema.ObjectId, ref: 'Card' }],
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    backgroundColor: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})

CardSectionSchema.post('save', function(doc) {
  this.model('Page').update(
    { _id: doc.page },
    { $push: {
      sections: {
        kind: 'CardSection',
        section: this._id
      }
    }},
    { new: true }
  )
})

CardSectionSchema.pre('remove', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.model('Card').remove({ _id: { $in: this.cards }})
  next()
})

const CardSection = mongoose.model('CardSection', CardSectionSchema)

export default CardSection
