import React from 'react'
import { connect } from 'react-redux'
import AdminBrandForm from '../components/AdminBrandForm'
import AdminBrandImage from '../components/AdminBrandImage'

// width: 256
// height: 128
const imageSpec = {
  type: 'image/png',
  width: 128,
  height: 128
}


const AdminBrand = ({ dispatch, isFetching, _id, image, initialValues }) => {
  return (
    isFetching ? null :
    <section>
      <AdminBrandImage item={{ _id, image }} imageSpec={imageSpec} /><br/><br/>
      <AdminBrandForm item={{ _id }} initialValues={initialValues}/>
    </section>

  )
}

const mapStateToProps = ({ brand }) => {
  const { isFetching, _id, business, socialMedia, theme, image } = brand
  return {
    isFetching,
    _id,
    image,
    initialValues: {
      name: business.name,
      description: business.description,
      phone: business.phone,
      email: business.email,
      street: business.street,
      city: business.city,
      state: business.state,
      zip: business.zip,
      facebook: socialMedia.facebook,
      github: socialMedia.github,
      google: socialMedia.google,
      instagram: socialMedia.instagram,
      linkedin: socialMedia.linkedin,
      yelp: socialMedia.yelp,
      twitter: socialMedia.twitter,
      youtube: socialMedia.youtube,
      mainColor: theme.main.color,
      fontFamily: theme.fontFamily,
      fontFamily2: theme.fontFamily2,
      fontFamily3: theme.fontFamily3,
      appBarColor: theme.appBar.color,
      appBarTextColor: theme.appBar.textColor,
      footerColor: theme.footer.color,
      footerTextColor: theme.footer.textColor,
      footerBorderBottom: theme.footer.borderBottom,
      primary1Color: theme.palette.primary1Color,
      primary2Color: theme.palette.primary2Color,
      primary3Color: theme.palette.primary3Color,
      accent1Color: theme.palette.accent1Color,
      accent2Color: theme.palette.accent2Color,
      accent3Color: theme.palette.accent3Color,
      textColor: theme.palette.textColor,
      secondaryTextColor: theme.palette.secondaryTextColor,
      alternateTextColor: theme.palette.alternateTextColor,
      canvasColor: theme.palette.canvasColor,
      borderColor: theme.palette.borderColor,
      disabledColor: theme.palette.disabledColor,
      pickerHeaderColor: theme.palette.pickerHeaderColor,
      clockCircleColor: theme.palette.clockCircleColor,
      shadowColor: theme.palette.shadowColor
    }
  }
}

export default connect(mapStateToProps)(AdminBrand)
