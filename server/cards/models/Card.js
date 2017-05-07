import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, required: true },
  pageName: { type: String, required: true, trim: true },
  width: { type: Number },
  image: { type: String },
  carousel: [{
    _id: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, trim: true },
    image: { type: String }
  }],
  iFrame: { type: String, trim: true },
  title: { type: String, trim: true },
  text: { type: String, trim: true },
  link: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
})

const Card = mongoose.model('Card', CardSchema)

export default Card
