import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  contents: {
    heroImage: { type: String, default: 'http://placehold.it/1920x1080' },
    heroTitle: { type: String, default: 'Hero Image Heading' },
    heroText: { type: String, default: 'Hero image text'  },
    features: [{
      image: { type: String, default: 'http://placehold.it/275x250' },
      title: { type: String, default: 'Feature'  },
      description: { type: String, default: 'The desription of the feature'  },
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Page = mongoose.model('Page', PageSchema)

export default Page
