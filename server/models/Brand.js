import mongoose, { Schema } from 'mongoose'

const s3Path = `${process.env.APP_NAME}/brand/image_`

const BrandSchema = new Schema({
  appBar: {
    image: {
      src: { type: String, minlength: 1, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      name: { type: String, minlength: 1, trim: true, default: 'Brand' },
      backgroundColor: { type: String, minlength: 1, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      font: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
      textShadow: { type: String, trim: true },
      navColor: { type: String, minlength: 1, trim: true, default: '#ffffff' }
    }
  },
  main: {
    styles: {
      backgroundColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      color: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
    }
  },
  business: {
    name: { type: String, minlength: 1, trim: true, default: 'Brand' },
    description: { type: String, minlength: 1, trim: true },
    phone: { type: String, minlength: 1, trim: true },
    email: { type: String, minlength: 1, trim: true },
    street: { type: String, minlength: 1, trim: true },
    city: { type: String, minlength: 1, trim: true },
    state: { type: String, minlength: 1, trim: true },
    zip: { type: String, minlength: 1, trim: true },
    facebook: { type: String, minlength: 1, trim: true },
    github: { type: String, minlength: 1, trim: true },
    google: { type: String, minlength: 1, trim: true },
    instagram: { type: String, minlength: 1, trim: true },
    linkedin: { type: String, minlength: 1, trim: true },
    twitter: { type: String, minlength: 1, trim: true },
    yelp: { type: String, minlength: 1, trim: true },
    youtube: { type: String, minlength: 1, trim: true },
  },
  footer: {
    image: {
      src: { type: String, minlength: 1, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    styles: {
      backgroundColor: { type: String, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, trim: true, default: '#ffffff' },
      borderTop: { type: String, trim: true },
      borderBottom: { type: String, trim: true },
      margin: { type: String, trim: true },
    }
  },
  theme: {
    fontFamily: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
    palette: {
      primary1Color: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      primary2Color: { type: String, minlength: 1, trim: true, default: '#0097A7' },
      primary3Color: { type: String, minlength: 1, trim: true, default: '#BDBDBD' },
      accent1Color: { type: String, minlength: 1, trim: true, default: '#FF4081' },
      accent2Color: { type: String, minlength: 1, trim: true, default: '#F5F5F5' },
      accent3Color: { type: String, minlength: 1, trim: true, default: '#9E9E9E' },
      textColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      secondaryTextColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      alternateTextColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      canvasColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      borderColor: { type: String, minlength: 1, trim: true, default: '#E0E0E0' },
      disabledColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .3)' },
      pickerHeaderColor: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      clockCircleColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .7)' },
      shadowColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 1)' }
    }
  }
}, {
  timestamps: true
})

BrandSchema.pre('remove', function(next) {
  const brand = this
  if (brand.image) {
    const Key = `${s3Path}${brand._id}`
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
