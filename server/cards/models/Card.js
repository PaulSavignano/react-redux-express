import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, required: true },
  pageName: { type: String, required: true, trim: true },
  image: { type: String },
  values: {
    header: { type: String, trim: true },
    width: { type: Number },
    iFrame: { type: String, trim: true },
    title: { type: String, trim: true },
    text: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now }
})

const Card = mongoose.model('Card', CardSchema)

export default Card
