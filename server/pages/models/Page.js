import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  slug: { type: String },
  components: [{
    component: { type: String },
    visible: { type: Boolean },
    contents: {
       header: { type: String },
       image: { type: String },
       title: { type: String },
       text: { type: String }
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
