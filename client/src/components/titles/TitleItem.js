import React from 'react'

import titleContainer from '../../containers/titles/titleContainer'

const TitleItem = ({
  item: {
    _id,
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

export default titleContainer(TitleItem)
