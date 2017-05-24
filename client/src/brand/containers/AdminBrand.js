import React from 'react'
import { connect } from 'react-redux'
import AdminBrandForm from '../components/AdminBrandForm'
import AdminBrandImage from '../components/AdminBrandImage'

import { fetchAdd } from '../actions/index'

const imageSize = {
  width: 255,
  height: 65
}
const placeholdit = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminBrandPage = ({ dispatch, isFetching, brand, initialValues }) => {
  return (
    isFetching ? null : !brand.values ? null :
    <main>
      <section><h1>Brand Admin</h1></section>
      <AdminBrandImage brand={brand} imageSize={imageSize} placeholdit={placeholdit} />
      <AdminBrandForm brand={brand} initialValues={initialValues}/>
    </main>

  )
}

const mapStateToProps = (state) => {
  if (state.brand.values.name) {
    return {
      isFetching: state.brand.isFetching,
      brand: state.brand,
      initialValues: {
        fontFamily: state.brand.values.fontFamily,
        primary1Color: state.brand.values.palette.primary1Color,
        primary2Color: state.brand.values.palette.primary2Color,
        primary3Color: state.brand.values.palette.primary3Color,
        accent1Color: state.brand.values.palette.accent1Color,
        accent2Color: state.brand.values.palette.accent2Color,
        accent3Color: state.brand.values.palette.accent3Color,
        textColor: state.brand.values.palette.textColor,
        alternateTextColor: state.brand.values.palette.alternateTextColor,
        canvasColor: state.brand.values.palette.canvasColor,
        borderColor: state.brand.values.palette.borderColor,
        disabledColor: state.brand.values.palette.disabledColor,
        pickerHeaderColor: state.brand.values.palette.pickerHeaderColor,
        clockCircleColor: state.brand.values.palette.clockCircleColor,
        shadowColor: state.brand.values.palette.shadowColor
      }
    }
  } else {
    return {
      isFetching: state.brand.isFetching,
      brand: state.brand,
      initialValues: {}
    }
  }
}

export default connect(mapStateToProps)(AdminBrandPage)
