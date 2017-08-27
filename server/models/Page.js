import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  slug: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  values: {
    name: { type: String, trim: true, minlength: 1 }
  },
}, {
  timestamps: true
})

function autopopulate(next) {
  this.populate({
    path: 'sections',
    populate: { path: 'items.item' }
  })
  next();
}

PageSchema.pre('find', autopopulate)
PageSchema.pre('findOne', autopopulate)

PageSchema.pre('remove', function(next) {
  this.model('sections.section').remove({ _id: { $in: this.sections.section }})
  next()
})

const Page = mongoose.model('Page', PageSchema)

export default Page
