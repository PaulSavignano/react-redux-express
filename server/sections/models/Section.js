import mongoose, { Schema } from 'mongoose'

const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, required: true },
  pageName: { type: String, required: true, trim: true },
  order: { type: Number },
  image: { type: String },
  values: {
    height: { type: Number },
    backgroundColor: { type: String },
    backgroundAttachment: { type: String },
    title: { type: String },
    text: { type: String },
    margin: { type: String },
    padding: { type: String },
    color: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
})

const Section = mongoose.model('Section', SectionSchema)

export default Section
