import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  slug: { type: String },
  components: [{ 
    componentId: { type: Schema.Types.ObjectId }
  }],
  hero: {
    image: { type: String, trim: true },
    values: {
      title: { type: String, trim: true },
      text: { type: String, trim: true },
    },
    createdAt: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now }
})

const Page = mongoose.model('Page', PageSchema)

export default Page
