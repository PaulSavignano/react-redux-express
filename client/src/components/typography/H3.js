import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H3 = ({
  children,
  className,
  color,
  textAlign,
  textColor,
  textShadow,
  typography: {
    values: {
      fontFamily,
      fontWeight,
      h3FontFamily,
      h3FontSize: fontSize,
      h3LetterSpacing: letterSpacing,
      h3Margin: margin,
      lineHeight
    }
  }
}) => (
  <h3
    style={{
      color: color || textColor,
      fontFamily: h3FontFamily || fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      margin,
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
