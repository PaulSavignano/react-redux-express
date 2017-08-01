import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

class TitleItem extends Component {
  render() {
    const { dispatch, isFetching, item, values } = this.props
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

export default connect(mapStateToProps)(TitleItem)
