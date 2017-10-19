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
      imageBorderRadius: { type: String, trim: true },
      imageElevation: { type: String, trim: true },
      imagePosition: { type: String, trim: true, default: 'relative' },
      imageWidth: { type: String, trim: true },
      letterSpacing: { type: String, trim: true },
      name: { type: String, trim: true, default: 'Brand' },
      navColor: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      phoneSize: { type: String, trim: true },
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
      h1Color: { type: String, trim: true },
      h1TextShadow: { type: String, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, trim: true },
      h2TextShadow: { type: String, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, trim: true },
      h3TextShadow: { type: String, trim: true },
      pColor: { type: String, trim: true },
      mediaBorder: { type: String, trim: true },
      mediaElevation: { type: Number, trim: true, default: 2 }
    }
  },
  bodyStyle: {
    values: {
      backgroundColor: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      color: { type: String, trim: true },
    }
  },
  business: {
    image: {
      src: { type: String, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      city: { type: String, trim: true, default: null },
      description: { type: String, trim: true, default: null },
      email: { type: String, trim: true, default: null },
      facebook: { type: String, trim: true },
      github: { type: String, trim: true },
      google: { type: String, trim: true },
      googleAnalyticsUA: { type: String, trim: true, minlength: 1 },
      googleSiteVerification: { type: String, trim: true, minlength: 1 },
      imageBorderRadius: { type: String, trim: true },
      imageElevation: { type: Number, trim: true },
      instagram: { type: String, trim: true },
      keywords: { type: String, trim: true },
      license: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      name: { type: String, trim: true, default: 'Brand' },
      phone: { type: String, trim: true, default: null },
      state: { type: String, trim: true, default: null },
      street: { type: String, trim: true, default: null },
      stripePk: { type: String, trim: true, minlength: 1 },
      twitter: { type: String, trim: true },
      yelp: { type: String, trim: true },
      youtube: { type: String, trim: true },
      zip: { type: String, trim: true, default: null },
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
      h1Color: { type: String, trim: true },
      h1TextShadow: { type: String, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, trim: true },
      h2TextShadow: { type: String, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, trim: true },
      h3TextShadow: { type: String, trim: true },
      pColor: { type: String, trim: true },
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
      imageBorderRadius: { type: String, trim: true },
      imageElevation: { type: String, trim: true },
      imageMargin: { type: String, trim: true },
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
      mediaElevation: { type: Number, trim: true, default: 2 }
    }
  },
  typography: {
    values: {
      fontFamily: { type: String, trim: true, default: 'Roboto, sans-serif' },
      fontWeight: { type: String, trim: true, default: '300'},
      h1FontFamily: { type: String, trim: true },
      h1FontSize: { type: String, trim: true, default: 'calc(2em + 1vw)' },
      h1LetterSpacing: { type: String, trim: true, default: '1px' },
      h2FontFamily: { type: String, trim: true },
      h2FontSize: { type: String, trim: true, default: 'calc(1.5em + 1vw)' },
      h2LetterSpacing: { type: String, trim: true, default: '1px' },
      h3FontFamily: { type: String, trim: true },
      h3FontSize: { type: String, trim: true, default: 'calc(1.17em + 1vw)' },
      h3LetterSpacing: { type: String, trim: true, default: '1px' },
      h3LineHeight: { type: String, trim: true },
      lineHeight: { type: String, trim: true },
      pFontFamily: { type: String, trim: true },
      pFontSize: { type: String, trim: true, default: '16px' },
      pLetterSpacing: { type: String, trim: true },
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
