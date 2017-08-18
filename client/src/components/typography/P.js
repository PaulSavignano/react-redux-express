import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const P = ({
  children,
  color,
  textAlign,
  textShadow,
  typography: {
    values: {
      pFontFamily,
      pFontSize,
      pFontWeight,
      pLetterSpacing
    }
  }
}) => (
  <p
    style={{
      color,
      fontFamily: pFontFamily,
      fontSize: pFontSize,
      fontWeight: pFontWeight,
      letterSpacing: pLetterSpacing,
      textAlign,
      textShadow,
    }}
  >
    {children}
  </p>
)

export default typographyContainer(P)
