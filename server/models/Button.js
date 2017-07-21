import mongoose, { Schema } from 'mongoose'

const ButtonSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  slug: { type: String },
  values: {
    backgroundColor: { type: String, trim: true, default: 'inherit' },
    border: { type: String, trim: true },
    color: { type: String, trim: true, default: '#ffffff' },
    label: { type: String, trim: true, default: 'Button' },
    link: { type: String, trim: true },
    margin: { type: String, trim: true },
    maxWidth: { type: Number },
    width: { type: Number }
  }
}, {
  timestamps: true
})

const Button = mongoose.model('Button', ButtonSchema)

export default Button
