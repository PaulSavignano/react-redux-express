import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const P = ({
  children,
  className,
  fontFamily,
  color,
  typography: {
    values: {
      pFontFamily,
      pFontSize,
      pFontWeight,
      pLetterSpacing,
      pLineHeight
    }
  }
}) => (
  <div
    style={{
      color,
      fontFamily: fontFamily || pFontFamily,
      fontSize: pFontSize,
      fontWeight: pFontWeight,
      letterSpacing: pLetterSpacing,
      lineHeight: pLineHeight,
      overflow: 'hidden',
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
