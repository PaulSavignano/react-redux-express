import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const CardSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  cards: [{ type: Schema.ObjectId, ref: 'Card' }],
  values: {
    backgroundColor: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})

CardSectionSchema.post('save', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $push: {
      sections: {
        kind: 'CardSection',
        section: this._id
      }
    }},
    { new: true }
  )
  next()
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
