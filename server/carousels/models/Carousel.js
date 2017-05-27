import mongoose, { Schema } from 'mongoose'

const CarouselSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, required: true },
  pageName: { type: String, required: true, trim: true },
  image: { type: String },
  values: {
    text: { type: String, trim: true }
  },
  createdAt: { type: Date, default: Date.now }
})

const Carousel = mongoose.model('Carousel', CarouselSchema)

export default Carousel
