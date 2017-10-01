import mongoose, { Schema } from 'mongoose'

const BrandSchema = new Schema({
  appBar: {
    image: {
      src: { type: String, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      backgroundColor: { type: String, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      fontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      fontSize: { type: String, trim: true, default: '24px' },
      fontWeight: { type: String, trim: true, default: '300' },
      height: { type: String, trim: true },
      imagePosition: { type: String, trim: true, default: 'relative' },
      letterSpacing: { type: String, trim: true },
      name: { type: String, trim: true, default: 'Brand' },
      navColor: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      showPhone: { type: String, trim: true, default: 'false' },
      textShadow: { type: String, trim: true },
    }
  },
  articleStyle: {
    values: {
      button1BackgroundColor: { type: String, trim: true },
      button2BackgroundColor: { type: String, trim: true },
      button1Border: { type: String, trim: true },
      button2Border: { type: String, trim: true },
      button1Color: { type: String, trim: true },
      button2Color: { type: String, trim: true },
      h1Align: { type: String, trim: true, default: 'center' },
      h1Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h1TextShadow: { type: String, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h2TextShadow: { type: String, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h3TextShadow: { type: String, trim: true },
      pColor: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      mediaBorder: { type: String, trim: true },
      mediaBoxShadow: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' },
      mediaElevation: { type: Number, trim: true, default: 2 }
    }
  },
  bodyStyle: {
    values: {
      backgroundColor: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      color: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
    }
  },
  business: {
    image: {
      src: { type: String, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      name: { type: String, trim: true, default: 'Brand' },
      license: { type: String, trim: true },
      description: { type: String, trim: true, default: null },
      keywords: { type: String, trim: true },
      googleSiteVerification: { type: String, trim: true, minlength: 1 },
      googleAnalyticsUA: { type: String, trim: true, minlength: 1 },
      stripePk: { type: String, trim: true, minlength: 1 },
      phone: { type: String, trim: true, default: null },
      email: { type: String, trim: true, default: null },
      street: { type: String, trim: true, default: null },
      city: { type: String, trim: true, default: null },
      state: { type: String, trim: true, default: null },
      zip: { type: String, trim: true, default: null },
      facebook: { type: String, trim: true },
      github: { type: String, trim: true },
      google: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      yelp: { type: String, trim: true },
      youtube: { type: String, trim: true },
    }
  },
  cardStyle: {
    values: {
      button1BackgroundColor: { type: String, trim: true },
      button2BackgroundColor: { type: String, trim: true },
      button1Border: { type: String, trim: true },
      button2Border: { type: String, trim: true },
      button1Color: { type: String, trim: true },
      button2Color: { type: String, trim: true },
      elevation: { type: Number, trim: true, default: 1 },
      flex: { type: String, trim: true, default: '1 1 300px' },
      h1Align: { type: String, trim: true, default: 'center' },
      h1Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h1TextShadow: { type: String, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h2TextShadow: { type: String, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      h3TextShadow: { type: String, trim: true },
      pColor: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      margin: { type: String, trim: true, default: '16px' },
      mediaBorder: { type: String, trim: true },
    }
  },
  footer: {
    image: {
      src: { type: String, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      backgroundColor: { type: String, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, trim: true, default: '#ffffff' },
      borderTop: { type: String, trim: true },
      borderBottom: { type: String, trim: true },
      margin: { type: String, trim: true },
    }
  },
  heroStyle: {
    values: {
      alignItems: { type: String, trim: true, default: 'center' },
      button1Color: { type: String, trim: true },
      button2Color: { type: String, trim: true },
      button1BackgroundColor: { type: String, trim: true },
      button2BackgroundColor: { type: String, trim: true },
      button1Border: { type: String, trim: true },
      button2Border: { type: String, trim: true },
      h1Align: { type: String, trim: true, default: 'center' },
      h1Color: { type: String, trim: true, default: 'rgba(255, 255, 255, .87)'},
      h1TextShadow: { type: String, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, trim: true, default: 'rgba(255, 255, 255, .87)' },
      h2TextShadow: { type: String, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, trim: true, default: 'rgba(255, 255, 255, .87)' },
      h3TextShadow: { type: String, trim: true },
      pColor: { type: String, trim: true, default: 'rgba(0, 0, 0, .87)' },
      mediaBorder: { type: String, trim: true },
      mediaBoxShadow: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' },
      mediaElevation: { type: Number, trim: true, default: 2 },
      minHeight: { type: String, trim: true, default: '85vh' }
    }
  },
  palette: {
    values: {
      primary1Color: { type: String, trim: true, default: '#00BCD4' },
      primary2Color: { type: String, trim: true, default: '#0097A7' },
      primary3Color: { type: String, trim: true, default: '#BDBDBD' },
      accent1Color: { type: String, trim: true, default: '#FF4081' },
      accent2Color: { type: String, trim: true, default: '#F5F5F5' },
      accent3Color: { type: String, trim: true, default: '#9E9E9E' },
      textColor: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      secondaryTextColor: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      alternateTextColor: { type: String, trim: true, default: '#ffffff' },
      canvasColor: { type: String, trim: true, default: '#ffffff' },
      borderColor: { type: String, trim: true, default: '#E0E0E0' },
      disabledColor: { type: String, trim: true, default: 'rgba(0, 0, 0, .3)' },
      pickerHeaderColor: { type: String, trim: true, default: '#00BCD4' },
      clockCircleColor: { type: String, trim: true, default: 'rgba(0, 0, 0, .7)' },
      shadowColor: { type: String, trim: true, default: 'rgba(0, 0, 0, 1)' }
    }
  },
  productStyle: {
    values: {
      descriptionColor: { type: String, trim: true },
      detailColor: { type: String, trim: true },
      flex: { type: String, trim: true, default: '1 1 auto' },
      nameColor: { type: String, trim: true },
      nameTextShadow: { type: String, trim: true },
      margin: { type: String, trim: true, default: '16px' },
      mediaBoxShadow: { type: String, trim: true, default: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' },
      mediaElevation: { type: Number, trim: true, default: 2 }
    }
  },
  typography: {
    values: {
      fontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      h1FontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      h1FontSize: { type: String, trim: true, default: '56px'},
      h1FontWeight: { type: String, trim: true, default: '300' },
      h1LetterSpacing: { type: String, trim: true, default: '1px' },
      h1LineHeight: { type: String, trim: true, default: '48px' },
      h2FontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      h2FontSize: { type: String, trim: true, default: '1.5em' },
      h2FontWeight: { type: String, trim: true, default: '300' },
      h2LetterSpacing: { type: String, trim: true, default: 'normal' },
      h2LineHeight: { type: String, trim: true, default: '1.334' },
      h3FontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      h3FontSize: { type: String, trim: true, default: '1.25em' },
      h3FontWeight: { type: String, trim: true, default: '300' },
      h3LetterSpacing: { type: String, trim: true, default: 'normal' },
      h3LineHeight: { type: String, trim: true, default: '1.4' },
      pFontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      pFontSize: { type: String, trim: true, default: '16px' },
      pFontWeight: { type: String, trim: true, default: '300' },
      pLetterSpacing: { type: String, trim: true, default: 'normal' },
      pLineHeight: { type: String, trim: true, default: '1.6' },
    }
  }
},{
  timestamps: true
})

BrandSchema.post('findOneAndRemove', function(doc) {
  const { appBar, footer } = doc
  if (appBar.image.src) {
    deleteFile({ Key: appBar.image.src }).catch(err => console.error(err))
  }
  if (footer.image.src) {
    deleteFile({ Key: footer.image.src }).catch(err => console.error(err))
  }
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
