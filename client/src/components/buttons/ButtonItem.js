import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
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
