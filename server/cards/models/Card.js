import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema({
  sectionId: { type: String, required: true, trim: true },
  image: { type: String },
  values: {
    header: { type: String, trim: true },
    width: { type: String, trim: true },
    margin: { type: String, trim: true },
    maxWidth: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    iFrame: { type: String, trim: true },
    title: { type: String, trim: true },
    text: { type: String, trim: true },
    color: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now }
})

const Card = mongoose.model('Card', CardSchema)

export default Card
