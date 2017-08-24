import mongoose, { Schema } from 'mongoose'

import { deleteFiles } from '../middleware/s3'

const SwipeableSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  swipeableViews: [{ type: Schema.ObjectId, ref: 'SwipeableView' }],
  values: {
    backgroundColor: { type: String, trim: true },
    pageLink: { type: String, trim: true }
  }
}, {
  timestamps: true
})

SwipeableSectionSchema.post('save', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $push: {
      sections: {
        kind: 'SwipeableSection',
        section: this._id
      }
    }},
    { new: true }
  )
  next()
})

SwipeableSectionSchema.pre('remove', function(next) {
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.model('SwipeableView').remove({ _id: { $in: this.swipeableViews }})
  next()
})

const SwipeableSection = mongoose.model('SwipeableSection', SwipeableSectionSchema)

export default SwipeableSection
