import mongoose, { Schema } from 'mongoose'

const CarouselSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: { type: String },
  values: {
    text: { type: String, trim: true }
  },
  createdAt: { type: Date, default: Date.now }
})

const Carousel = mongoose.model('Carousel', CarouselSchema)

export default Carousel
