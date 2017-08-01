import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import AdminTitleEdit from './AdminTitleEdit'
import { startEdit } from '../../actions/titles'

class AdminTitleItem extends Component {
  render() {
    const { dispatch, item, isFetching, values } = this.props
    const {
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
      width,
    } = values
    return (
      !isFetching &&
      <div
        onTouchTap={() => dispatch(startEdit(item._id))}
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
        {item.editing && <AdminTitleEdit item={item} />}
      </div>
    )
  }
}

const mapStateToProps = ({ titles: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(AdminTitleItem)
