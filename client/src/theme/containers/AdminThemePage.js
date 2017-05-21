import React from 'react'
import { connect } from 'react-redux'
import AdminTheme from '../components/AdminTheme'
import AdminFavicon from '../components/AdminFavicon'

import { fetchAdd } from '../actions/index'

const imageSize = {
  width: 400,
  height: 400
}
const placeholdit = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminThemePage = ({ dispatch, isFetching, theme, initialValues }) => {
  !theme.values && dispatch(fetchAdd())
  return (
    isFetching ? null : !theme.values ? null :
    <main>
      <section><h1>Theme Admin</h1></section>
      <AdminFavicon theme={theme} imageSize={imageSize} placeholdit={placeholdit} />
      <AdminTheme theme={theme} initialValues={initialValues}/>
    </main>

  )
}

const mapStateToProps = (state) => {
  if (state.theme.values) {
    return {
      isFetching: state.theme.isFetching,
      theme: state.theme,
      initialValues: {
        appBarFontFamily: state.theme.values.appBar.fontFamily,
        appBarColor: state.theme.values.appBar.color,
        appBarTextColor: state.theme.values.appBar.textColor,
        fontFamily: state.theme.values.fontFamily,
        primary1Color: state.theme.values.palette.primary1Color,
        primary2Color: state.theme.values.palette.primary2Color,
        primary3Color: state.theme.values.palette.primary3Color,
        accent1Color: state.theme.values.palette.accent1Color,
        accent2Color: state.theme.values.palette.accent2Color,
        accent3Color: state.theme.values.palette.accent3Color,
        textColor: state.theme.values.palette.textColor,
        alternateTextColor: state.theme.values.palette.alternateTextColor,
        canvasColor: state.theme.values.palette.canvasColor,
        borderColor: state.theme.values.palette.borderColor,
        disabledColor: state.theme.values.palette.disabledColor,
        pickerHeaderColor: state.theme.values.palette.pickerHeaderColor,
        clockCircleColor: state.theme.values.palette.clockCircleColor,
        shadowColor: state.theme.values.palette.shadowColor
      }
    }
  } else {
    return {
      isFetching: state.theme.isFetching,
      theme: { values: null },
      initialValues: {}
    }
  }
}

export default connect(mapStateToProps)(AdminThemePage)
