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
      font,
      label,
      link,
      margin,
      width
    }
  }
}) => {
  const nav = link && link.indexOf("/") === 0 ? { onTouchTap: () => dispatch(push(link)) } : { href: link }
  const attributes = {
    backgroundColor,
    label,
    labelColor: color,
    labelStyle: { font },
    style: { backgroundColor, border, flex, margin, width },
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
