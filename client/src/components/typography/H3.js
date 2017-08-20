import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H3 = ({
  children,
  color,
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
      overflow: 'hidden',
      textAlign,
      textShadow,
    }}
  >
    {children}
  </h3>
)

export default typographyContainer(H3)
