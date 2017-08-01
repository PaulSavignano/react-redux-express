import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import AdminIframeEdit from './AdminIframeEdit'
import { startEdit } from '../../actions/iframes'

class AdminIframeItem extends Component {
  render() {
    const { dispatch, item, isFetching, values } = this.props
    const {
      backgroundColor,
      flex,
      iFrame,
      margin,
      width,
      zDepth
    } = values
    return (
      !isFetching &&
      <Card
        zDepth={zDepth}
        onTouchTap={() => dispatch(startEdit(item._id))}
        style={{ backgroundColor, flex, margin, width, cursor: 'pointer' }}
      >
        <div style={{ position: 'relative', paddingBottom: '50%', border: '16px solid white' }}>
          <iframe
            title="iFrame"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={iFrame} frameBorder="0" allowFullScreen
          >
          </iframe>
        </div>
        {item.editing && <AdminIframeEdit item={item} />}
      </Card>
    )
  }
}

const mapStateToProps = ({ iframes: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(AdminIframeItem)
