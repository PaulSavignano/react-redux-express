import mongoose, { Schema } from 'mongoose'

const IframeSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    border: { type: String, trim: true },
    flex: { type: String, trim: true, default: '1 1 auto' },
    margin: { type: String, trim: true },
    iframe: { type: String, trim: true },
    width: { type: String, trim: true },
    zDepth: { type: Number, trime: true, default: 1 }
  }
}, {
  timestamps: true
})

const Iframe = mongoose.model('Iframe', IframeSchema)

export default Iframe
