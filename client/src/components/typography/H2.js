import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const H2 = ({
  children,
  className,
  color,
  textAlign,
  textShadow,
  typography: {
    values: {
      h2FontFamily,
      h2FontSize,
      h2FontWeight,
      h2LetterSpacing,
      h2LineHeight,
    }
  }
}) => (
  <h2
    style={{
      color,
      fontFamily: h2FontFamily,
      fontSize: h2FontSize,
      fontWeight: h2FontWeight,
      letterSpacing: h2LetterSpacing,
      lineHeight: h2LineHeight,
      overflow: 'hidden',
      textAlign,
      textShadow,
    }}
    {...className}
  >
    {children}
  </h2>
)

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  textShadow: PropTypes.string,
  typography: PropTypes.object
}

export default typographyContainer(H2)
