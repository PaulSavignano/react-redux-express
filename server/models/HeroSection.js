import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const HeroSectionSchema = new Schema({
  page: { type: Schema.ObjectId, ref: 'Page' },
  items: [{ type: Schema.ObjectId, ref: 'Hero' }],
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

HeroSectionSchema.post('save', function(doc) {
  this.model('Page').update(
    { _id: this.page },
    { $push: {
      sections: {
        kind: 'HeroSection',
        section: this._id
      }
    }},
    { new: true }
  )
})

HeroSectionSchema.pre('remove', function(next) {
  if (this.image && this.image.src) {
    deleteFile({ Key: this.image.src }).catch(err => console.error(err))
  }
  this.model('Page').update(
    { _id: this.page },
    { $pull: { section: this._id }},
    { multi: true }
  )
  this.model('Hero').remove({ _id: { $in: this.heros }})
  next()
})

const HeroSection = mongoose.model('HeroSection', HeroSectionSchema)

export default HeroSection
