import React from 'react'
import { push } from 'react-router-redux'
import RaisedButton from 'material-ui/RaisedButton'

import buttonContainer from '../../containers/buttons/buttonContainer'

const ButtonItem = ({
  dispatch,
  item: {
    values: {
      backgroundColor,
      border,
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      letterSpacing,
      link,
      margin,
      padding,
      textShadow,
      width
    }
  }
}) => {
  const nav = !link ? null : link.indexOf("/") === 0 ? { onTouchTap: () => dispatch(push(link)) } : { onTouchTap: () => window.location = link }
  const attributes = {
    backgroundColor,
    label,
    labelColor: color,
    labelStyle: { fontFamily, fontSize, fontWeight, letterSpacing, textShadow },
    style: { backgroundColor, border, flex, margin, padding, width },
    type: "button",
    ...nav
  }
  return (
    <RaisedButton
      {...attributes}
    />
  )
}

export default buttonContainer(ButtonItem)
