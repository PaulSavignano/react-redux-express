import mongoose, { Schema } from 'mongoose'

const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageName: { type: String },
  order: { type: Number },
  image: { type: String },
  values: {
    height: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    backgroundAttachment: { type: String, trim: true },
    title: { type: String, trim: true },
    titleAlign: { type: String, trim: true },
    text: { type: String, trim: true },
    textAlign: { type: String, trim: true },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    color: { type: String, trim: true }
  },
  createdAt: { type: Date, default: Date.now }
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
