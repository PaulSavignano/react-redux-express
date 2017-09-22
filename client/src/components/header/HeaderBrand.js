import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HeaderBrand = ({
  item: {
    image,
    values: {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      imagePosition,
      letterSpacing,
      name,
      textShadow
    }
  },
  maxHeight
}) => {
  const styles = { color, fontFamily, fontSize, fontWeight, letterSpacing, textShadow }
  return (
    <Link
      className="header-brand"
      to="/"
    >
      { image && image.src && <img src={image.src} className={imagePosition} style={{ position: imagePosition, maxHeight }} alt="brand" /> }
      { name && <div style={{ ...styles }}>{name}</div> }
    </Link>
  )
}

HeaderBrand.propTypes = {
  item: PropTypes.object.isRequired
}

export default HeaderBrand
