import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  slug: { type: String },
  components: [{
    type: { type: String },
    image: { type: String },
    values: {
      header: { type: String },
      width: { type: Number },
      youtube: { type: String },
      title: { type: String },
      text: { type: String },
      link: { type: String },
    },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Page = mongoose.model('Page', PageSchema)

export default Page
