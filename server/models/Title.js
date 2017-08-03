import mongoose, { Schema } from 'mongoose'

const TitleSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    color: { type: String, trim: true },
    flex: { type: String, trim: true, default: '0 1 auto' },
    fontWeight: { type: String, trim: true },
    fontSize: { type: String, trim: true },
    fontFamily: { type: String, trim: true },
    letterSpacing: { type: String, trim: true },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    text: { type: String, trim: true, default: 'Title' },
    textAlign: { type: String, trim: true, default: 'center' },
    textShadow: { type: String, trim: true },
    width: { type: String, trim: true },
  }
}, {
  timestamps: true
})

const Title = mongoose.model('Title', TitleSchema)

export default Title
