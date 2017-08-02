import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

class ImageItem extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image, values } = this.props.item
    if (image && image.src) {
      const img = new Image()
      const src = image.src
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
    } else {
      this.setState({ loading: false })
    }
  }
  render() {
    const { image, loading } = this.state
    const { dispatch, isFetching, item, values } = this.props
    const {
      flex,
      margin,
      text,
      width,
      zDepth
    } = values
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
        style={{ flex, margin, width }}
      >
        <Card
          zDepth={zDepth}
        >
          <CardMedia><img src={image} alt="card"/></CardMedia>
        </Card>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ images: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(ImageItem)
