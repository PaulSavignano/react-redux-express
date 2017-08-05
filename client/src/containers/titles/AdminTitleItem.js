import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import titleContainer from './titleContainer'
import AdminTitleEdit from './AdminTitleEdit'
import { startEdit } from '../../actions/titles'

const AdminTitleItem = ({ dispatch, item }) => {
  const {
    _id,
    editing,
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
  } = item
  return (
    <div
      onTouchTap={() => dispatch(startEdit(_id))}
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
        width,
        cursor: 'pointer'
      }}
    >
      {text}
      {editing && <AdminTitleEdit item={item} />}
    </div>
  )
}

export default titleContainer(connect()(AdminTitleItem))
