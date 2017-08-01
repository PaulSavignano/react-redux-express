import mongoose, { Schema } from 'mongoose'

const TitleSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    flex: { type: String, trim: true, default: '1 1 auto' },
    font: { type: String, trim: true },
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
