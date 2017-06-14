import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../../middleware/s3'

const s3Path = `${process.env.APP_NAME}/cards/card_`

const CardSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: { type: String },
  values: {
    width: { type: Number },
    maxWidth: { type: Number },
    zDepth: { type: Number, default: 1 },
    margin: { type: String, trim: true },
    color: { type: String, trim: true },
    backgroundColor: { type: String, trim: true },
    header: { type: String, trim: true },
    iFrame: { type: String, trim: true },
    title: { type: String, trim: true },
    titleAlign: { type: String, trim: true },
    text: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now }
})

CardSchema.pre('remove', function(next) {
  const card = this
  console.log('inside Card pre remove: ', card)
  if (card.image) {
    const Key = `${s3Path}${card._id}`
    deleteFile({ Key }).catch(err => console.log(err))
  }
  next()
})

const Card = mongoose.model('Card', CardSchema)

export default Card
