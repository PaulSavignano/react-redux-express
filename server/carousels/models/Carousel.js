import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../../middleware/s3'

const s3Path = `${process.env.APP_NAME}/carousels/carousel_`

const CarouselSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: { type: String },
  values: {
    text: { type: String, trim: true }
  },
  createdAt: { type: Date, default: Date.now }
})

CarouselSchema.pre('remove', function(next) {
  const carousel = this
  if (carousel.image) {
    const Key = `${s3Path}${carousel._id}`
    deleteFile({ Key }).catch(err => console.log(err))
  }
  next()
})

const Carousel = mongoose.model('Carousel', CarouselSchema)

export default Carousel
