import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  slug: { type: String },
  hero: {
    image: { type: String },
    values: {
      title: { type: String },
      text: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
  },
  cards: [{
    type: { type: String, trim: true  },
    image: { type: String, trim: true },
    values: {
      header: { type: String, trim: true },
      width: { type: Number },
      youtube: { type: String, trim: true },
      title: { type: String, trim: true },
      text: { type: String, trim: true },
      link: { type: String, trim: true },
    },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

const Page = mongoose.model('Page', PageSchema)

export default Page
