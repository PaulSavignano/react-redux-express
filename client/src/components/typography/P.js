import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const P = ({
  children,
  className,
  color,
  textColor,
  typography: {
    values: {
      fontFamily,
      fontWeight,
      pFontFamily,
      pFontSize: fontSize,
      pLetterSpacing: letterSpacing,
      lineHeight
    }
  }
}) => (
  <div
    style={{
      color: color || textColor,
      fontFamily: pFontFamily || fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight
    }}
    {...className}
  >
    {children}
  </div>
)

P.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fontFamily: PropTypes.string,
  textColor: PropTypes.string,
}

export default typographyContainer(P)
