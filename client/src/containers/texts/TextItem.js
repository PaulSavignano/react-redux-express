import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'

class TextItem extends Component {
  render() {
    const { dispatch, isFetching, item, values } = this.props
    const {
      flex,
      margin,
      padding,
      text,
      width,
    } = values
    return (
      !isFetching &&
      <Paper zDepth={0} style={{ flex, margin, width }}>
        <div style={{ padding }}>{renderHTML(text)}</div>
      </Paper>
    )
  }
}

const mapStateToProps = ({ texts: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(TextItem)
