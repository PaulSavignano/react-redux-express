import mongoose, { Schema } from 'mongoose'

const ContactFormSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: 'CardSection' },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String, trim: true },
  values: {
    button1Text: { type: String, trim: true, default: 'Contact' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

const ContactForm = mongoose.model('ContactForm', ContactFormSchema)

export default ContactForm
