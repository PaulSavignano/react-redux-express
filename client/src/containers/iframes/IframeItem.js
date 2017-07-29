import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

class IframeItem extends Component {
  render() {
    const { image, loading, zDepth } = this.state
    const { dispatch, isFetching, item, values } = this.props
    const {
      backgroundColor,
      flex,
      iFrame,
      margin,
      text,
      width,
    } = values
    return (
      !isFetching &&
        <Card
          zDepth={zDepth}
          style={{ backgroundColor }}
        >
          <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
            <iframe
              title="iFrame"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={iFrame} frameBorder="0" allowFullScreen>
            </iframe>
          </div>
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

export default connect(mapStateToProps)(IframeItem)
