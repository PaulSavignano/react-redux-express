import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import RaisedButton from 'material-ui/RaisedButton'

const ButtonItem = ({ dispatch, item, isFetching, values }) => {
  const {
    backgroundColor,
    border,
    color,
    flex,
    font,
    label,
    link,
    margin,
    width,
  } = values
  let nav
  if (values.link) {
    nav = values.link.indexOf("/") === 0 ? { onTouchTap: () => dispatch(push(link)) } : { href: link }
  }
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
    !isFetching &&
      <RaisedButton
        {...attributes}
      />

  )
}

const mapStateToProps = ({ buttons: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(ButtonItem)
