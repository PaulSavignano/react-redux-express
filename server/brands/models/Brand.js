import mongoose, { Schema } from 'mongoose'

const BrandSchema = new Schema({
  image: { type: String, minlength: 1, trim: true },
  values: {
    name: { type: String, minlength: 1, trim: true, default: 'Brand' },
    phone: { type: String, minlength: 1, trim: true, default: '888-888-8888' },
    street: { type: String, minlength: 1, trim: true, default: '1234 Pattern Ln' },
    city: { type: String, minlength: 1, trim: true, default: 'Patternville' },
    state: { type: String, minlength: 1, trim: true, default: 'Ca' },
    zip: { type: String, minlength: 1, trim: true, default: '92011' },
    facebook: { type: String, minlength: 1, trim: true },
    github: { type: String, minlength: 1, trim: true },
    google: { type: String, minlength: 1, trim: true },
    instagram: { type: String, minlength: 1, trim: true },
    linkedin: { type: String, minlength: 1, trim: true },
    twitter: { type: String, minlength: 1, trim: true },
    yelp: { type: String, minlength: 1, trim: true },
    youtube: { type: String, minlength: 1, trim: true },
    fontFamily: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
    fontFamily2: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
    appBar: {
      color: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      textColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' }
    },
    palette: {
      primary1Color: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      primary2Color: { type: String, minlength: 1, trim: true, default: '#0097A7' },
      primary3Color: { type: String, minlength: 1, trim: true, default: '#BDBDBD' },
      accent1Color: { type: String, minlength: 1, trim: true, default: '#FF4081' },
      accent2Color: { type: String, minlength: 1, trim: true, default: '#F5F5F5' },
      accent3Color: { type: String, minlength: 1, trim: true, default: '#9E9E9E' },
      textColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      alternateTextColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      canvasColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      borderColor: { type: String, minlength: 1, trim: true, default: '#E0E0E0' },
      disabledColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .3)' },
      pickerHeaderColor: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      clockCircleColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .7)' },
      shadowColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 1)' }
    }
  },
  createdAt: { type: Date, default: Date.now }
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
