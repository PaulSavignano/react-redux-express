import { connect } from 'react-redux'
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from './Colors';

const Theme = ({ values }) => {
  return {
    fontFamily: values.fontFamily,
    palette: {
      primary1Color: values.primary1Color || cyan500,
      primary2Color: values.primary2Color || cyan700,
      primary3Color: values.primary3Color || grey400,
      accent1Color: values.accent1Color || pinkA200,
      accent2Color: values.accent2Color || grey100,
      accent3Color: values.accent3Color || grey500,
      textColor: values.textColor || darkBlack,
      alternateTextColor: values.alternateTextColor || white,
      canvasColor: values.canvasColor || white,
      borderColor: values.borderColor || grey300,
      pickerHeaderColor: values.pickerHeaderColor || cyan500,
      shadowColor: values.shadowColor || fullBlack,
    },
    appBar: {
      color: values.appBarColor || white,
      textColor: values.appBarTextColor || darkBlack
    },
  }
}
console.log(Theme)
const mapStateToProps = (state) => {
  if (state.theme.isFetching) {
    return { values: null }
  }
  return { values: state.theme.values }
}

export default connect(mapStateToProps)(Theme)
