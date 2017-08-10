import React from 'react'
import { connect } from 'react-redux'

import loadImage from '../images/loadImage'

const HeaderBrand = ({
  item: {
    image,
    values: {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      name,
      textShadow
    }
  }
}) => {
  const styles = { color, fontFamily, fontSize, fontWeight, letterSpacing, textShadow }
  return (
    <div
      style={{ height: '100%', maxHeight: 64, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}
    >
      { image && image.src && <img src={image.src} style={{ width: 'auto', height: 64, marginRight: 8 }} alt="" /> }
      { name && <div style={{ ...styles }}>{name}</div> }
    </div>
  )
}


const mapStateToProps = ({
  brand: {
    appBar: {
      image,
      values: {
        color,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        name,
        textShadow
      }
    }
  }
}) => ({
  item: {
    image,
    values: {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      name,
      textShadow
    }
  }
})

export default connect(mapStateToProps)(loadImage(HeaderBrand))
