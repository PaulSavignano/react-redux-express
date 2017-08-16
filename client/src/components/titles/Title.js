import React from 'react'

import titleContainer from '../../containers/titles/titleContainer'

const Title = ({
  item: {
    _id,
    values: {
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      margin,
      padding,
      textAlign,
      textShadow,
      text,
      width
    }
  }
}) => (
  <div
    style={{
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      margin,
      padding,
      textAlign,
      textShadow,
      width
    }}
    id={_id}
  >
    {text}
  </div>
)

export default titleContainer(Title)
