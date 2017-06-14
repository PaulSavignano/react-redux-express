import React from 'react'
import { connect } from 'react-redux'
import AdminBrandForm from '../components/AdminBrandForm'
import AdminBrandImage from '../components/AdminBrandImage'

// width: 256
// height: 128
const imageSize = {
  width: 128,
  height: 128
}


const AdminBrandPage = ({ dispatch, isFetching, brand, initialValues }) => {
  return (
    isFetching ? null : !brand.values ? null :
    <section>
      <AdminBrandImage brand={brand} imageSize={imageSize} /><br/><br/>
      <AdminBrandForm brand={brand} initialValues={initialValues}/>
    </section>

  )
}

const mapStateToProps = ({ brand }) => {
  return {
    isFetching: brand.isFetching,
    brand: brand,
    initialValues: {
      name: brand.values.name,
      description: brand.values.description,
      phone: brand.values.phone,
      email: brand.values.email,
      street: brand.values.street,
      city: brand.values.city,
      state: brand.values.state,
      zip: brand.values.zip,
      facebook: brand.values.facebook,
      github: brand.values.github,
      google: brand.values.google,
      instagram: brand.values.instagram,
      linkedin: brand.values.linkedin,
      yelp: brand.values.yelp,
      twitter: brand.values.twitter,
      youtube: brand.values.youtube,
      mainColor: brand.values.mainColor,
      fontFamily: brand.values.fontFamily,
      fontFamily2: brand.values.fontFamily2,
      appBarColor: brand.values.appBar.color,
      appBarTextColor: brand.values.appBar.textColor,
      footerColor: brand.values.footer.color,
      footerTextColor: brand.values.footer.textColor,
      primary1Color: brand.values.palette.primary1Color,
      primary2Color: brand.values.palette.primary2Color,
      primary3Color: brand.values.palette.primary3Color,
      accent1Color: brand.values.palette.accent1Color,
      accent2Color: brand.values.palette.accent2Color,
      accent3Color: brand.values.palette.accent3Color,
      textColor: brand.values.palette.textColor,
      secondaryTextColor: brand.values.palette.secondaryTextColor,
      alternateTextColor: brand.values.palette.alternateTextColor,
      canvasColor: brand.values.palette.canvasColor,
      borderColor: brand.values.palette.borderColor,
      disabledColor: brand.values.palette.disabledColor,
      pickerHeaderColor: brand.values.palette.pickerHeaderColor,
      clockCircleColor: brand.values.palette.clockCircleColor,
      shadowColor: brand.values.palette.shadowColor
    }
  }
}

export default connect(mapStateToProps)(AdminBrandPage)
