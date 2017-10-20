import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Media from '../media/Media'

const HeaderBrand = ({
  className,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  image,
  imageBorderRadius,
  imageElevation,
  imageClass,
  imagePosition,
  imageWidth,
  letterSpacing,
  name,
  textShadow,
}) => {
  return (
    <Link
      className={className}
      to="/"
    >
      {image && image.src ?
        <Media
          image={image}
          borderRadius={imageBorderRadius}
          className={imageClass}
          elevation={imageElevation}
          style={{ position: imagePosition, width: imageWidth }}
          alt="brand"
        />
      :
      <div
        style={{
          color,
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing,
          textShadow
        }}>
        {name}
      </div>
      }
    </Link>
  )
}

HeaderBrand.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  image: PropTypes.object,
  imageBorderRadius: PropTypes.string,
  imageElevation: PropTypes.number,
  imagePosition: PropTypes.string,
  letterSpacing: PropTypes.string,
  name: PropTypes.string,
  textShadow: PropTypes.string,
}

export default HeaderBrand
