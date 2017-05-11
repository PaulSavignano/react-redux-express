import mongoose, { Schema } from 'mongoose'

const HeroSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, required: true },
  pageName: { type: String, required: true, trim: true },
  image: { type: String },
  values: {
    title: { type: String, trim: true },
    text: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now }
})

const Hero = mongoose.model('Hero', HeroSchema)

export default Hero
