import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import RaisedButton from 'material-ui/RaisedButton'

const ButtonItem = ({ dispatch, item, isFetching }) => {
  const values = item.values || {}
  const {
    backgroundColor,
    color,
    label,
    link,
    margin,
    maxWidth,
    width,
  } = values
  const nav = link.indexOf("http") === 0 ? { href: link } : { onTouchTap: () => dispatch(push(link)) }
  const attributes = {
    backgroundColor,
    type: "button",
    label,
    labelColor: color,
    style: { backgroundColor, margin, maxWidth, width },
    ...nav
  }
  return (
    !isFetching &&
    <RaisedButton
      {...attributes}
    />
  )
}

const mapStateToProps = ({ buttons: { items, isFetching } }, { componentId }) => ({
  item: items.find(item => item._id === componentId),
  isFetching
})

export default connect(mapStateToProps)(ButtonItem)
