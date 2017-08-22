import React from 'react'
import PropTypes from 'prop-types'

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

HeaderBrand.propTypes = {
  item: PropTypes.object.isRequired
}

export default HeaderBrand
