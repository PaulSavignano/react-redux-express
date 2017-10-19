import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H1 = ({
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
      h1FontFamily,
      h1FontSize: fontSize,
      h1LetterSpacing: letterSpacing,
      lineHeight
    }
  }
}) => {
  return (
    <h1
      style={{
        color: color || textColor,
        fontFamily: h1FontFamily || fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign,
        textShadow,
      }}
      {...className}
    >
      {children}
    </h1>
  )
}

H1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  textShadow: PropTypes.string,
  typography: PropTypes.object
}

export default typographyContainer(H1)
