import mongoose, { Schema } from 'mongoose'

const TextSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    flex: { type: String, trim: true, default: '1 1 auto' },
    margin: { type: String, trim: true },
    padding: { type: String, trim: true },
    text: { type: String, trim: true, default: '<p>Text</p>' },
    width: { type: String, trim: true },
  }
}, {
  timestamps: true
})

TextSchema.pre('remove', function(next) {
  const text = this
  if (text.image) {
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Text = mongoose.model('Text', TextSchema)

export default Text
