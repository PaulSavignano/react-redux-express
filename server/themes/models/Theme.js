import mongoose, { Schema } from 'mongoose'

const ThemeSchema = new Schema({
  image: { type: String, minLength: 1, trim: true },
  values: {
    fontFamily: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
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
    },
    appBar: {
      fontFamily: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
      color: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      textColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' }
    }
  },
  createdAt: { type: Date, default: Date.now }
})

const Theme = mongoose.model('Theme', ThemeSchema)

export default Theme
