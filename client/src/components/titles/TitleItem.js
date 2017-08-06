import React from 'react'

import titleContainer from '../../containers/titles/titleContainer'

const TitleItem = ({
  item: {
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
  >
    {text}
  </div>
)

export default titleContainer(TitleItem)
