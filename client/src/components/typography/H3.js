import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H3 = ({
  children,
  className,
  color,
  margin,
  textAlign,
  textShadow,
  typography: {
    values: {
      h3FontFamily,
      h3FontSize,
      h3FontWeight,
      h3LetterSpacing,
      h3LineHeight
    }
  }
}) => (
  <h3
    style={{
      color,
      fontFamily: h3FontFamily,
      fontSize: h3FontSize,
      fontWeight: h3FontWeight,
      letterSpacing: h3LetterSpacing,
      lineHeight: h3LineHeight,
      margin,
      overflow: 'hidden',
      textAlign,
      textShadow,
    }}
    {...className}
  >
    {children}
  </h3>
)

H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  textShadow: PropTypes.string,
  typography: PropTypes.object
}

export default typographyContainer(H3)
