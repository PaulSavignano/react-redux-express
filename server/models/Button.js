import mongoose, { Schema } from 'mongoose'

const ButtonSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    backgroundColor: { type: String, trim: true, default: 'inherit' },
    border: { type: String, trim: true },
    color: { type: String, trim: true, default: '#ffffff' },
    flex: { type: String, trim: true },
    fontFamily: { type: String, trim: true },
    fontSize: { type: String, trim: true },
    fontWeight: { type: String, trim: true },
    label: { type: String, trim: true, default: 'Button' },
    letterSpacing: { type: String, trim: true },
    link: { type: String, trim: true },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    textShadow: { type: String, trim: true },
    width: { type: String, trim: true }
  }
}, {
  timestamps: true
})

const Button = mongoose.model('Button', ButtonSchema)

export default Button
