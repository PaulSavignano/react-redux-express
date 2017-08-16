import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const ArticleSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    title: { type: String, trim: true, default: 'Title' },
    text: { type: String, trim: true, default: '<p>Text</p>' },
    textAlign: { type: String, trim: true, default: 'right'},
    imageFlex: { type: String, trim: true, default: '1 1 auto' },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    navigation: { type: String, trim: true },
  }
}, {
  timestamps: true
})

ArticleSchema.pre('remove', function(next) {
  const article = this
  if (article.image && article.image.src) {
    deleteFile({ Key: article.image.src }).catch(err => console.error(err))
  }
  Section.findOneAndUpdate(
    { _id: article.sectionId },
    { $pull: { components: { componentId: article._id }}},
    { new: true }
  )
  .then(section => next({ article, section }))
  .catch(err => {
    console.error(err)
    next(err)
  })
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article
