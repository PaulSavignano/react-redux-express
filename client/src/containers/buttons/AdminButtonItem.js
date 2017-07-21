import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import RaisedButton from 'material-ui/RaisedButton'

import AdminButtonEdit from './AdminButtonEdit'
import { startEdit } from '../../actions/buttons'

const AdminButtonItem = ({ dispatch, item, isFetching }) => {
  const values = item.values || {}
  const {
    backgroundColor,
    border,
    color,
    label,
    link,
    margin,
    maxWidth,
    width,
  } = values
  const editComp = item.editing && { children: <AdminButtonEdit key={1} item={item} /> }
  const attributes = {
    backgroundColor,
    type: 'button',
    label,
    labelColor: color,
    style: { backgroundColor, border, margin, maxWidth, width },
    onTouchTap: () => dispatch(startEdit(item._id)),
    ...editComp
  }
  return (
    !isFetching &&
    <RaisedButton {...attributes} />
  )
}

const mapStateToProps = ({ buttons: { items, isFetching } }, { componentId }) => ({
  item: items.find(item => item._id === componentId),
  isFetching
})

export default connect(mapStateToProps)(AdminButtonItem)
