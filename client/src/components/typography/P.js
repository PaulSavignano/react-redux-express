import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const P = ({
  children,
  className,
  fontFamily,
  textColor
}) => (
  <div
    style={{
      color: textColor,
      fontFamily,
      overflow: 'hidden'
    }}
    {...className}
  >
    {children}
  </div>
)

export default typographyContainer(P)
