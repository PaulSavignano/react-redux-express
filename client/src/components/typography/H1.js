import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H1 = ({
  children,
  color,
  textAlign,
  textShadow,
  typography: {
    values: {
      h1FontFamily,
      h1FontSize,
      h1FontWeight,
      h1LetterSpacing,
      h1LineHeight
    }
  }
}) => {
  return (
    <h1
      style={{
        color,
        fontFamily: h1FontFamily,
        fontSize: h1FontSize,
        fontWeight: h1FontWeight,
        letterSpacing: h1LetterSpacing,
        lineHeight: h1LineHeight,
        overflow: 'hidden',
        textAlign,
        textShadow,
      }}
    >
      {children}
    </h1>
  )
}

export default typographyContainer(H1)
