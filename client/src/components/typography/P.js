import React from 'react'
import PropTypes from 'prop-types'

import typographyContainer from '../../containers/typography/typographyContainer'

const P = ({
  children,
  fontFamily,
  textColor
}) => (
  <div
    style={{
      color: textColor,
      flex: '1 1 auto',
      fontFamily,
      margin: '0 16px',
      overflow: 'hidden'
    }}
  >
    {children}
  </div>
)

export default typographyContainer(P)
