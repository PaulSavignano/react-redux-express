import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import AdminImageEdit from './AdminImageEdit'
import { startEdit } from '../../actions/images'

class AdminImageItem extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image && image.src) {
      const img = new Image()
      const src = image.src
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
    } else {
      this.setState({ loading: false })
    }
  }
  componentWillReceiveProps({ item: { image, updatedAt } }) {
    if (image && image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image && image.src) return this.setState({ image: null })
  }
  render() {
    const { image, loading } = this.state
    const { dispatch, item, isFetching, values } = this.props
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
        transitionEnter={false}
        transitionLeave={false}
        transitionAppearTimeout={600}
        style={{ flex, margin, width }}
      >
        <Card
          zDepth={zDepth}
          onTouchTap={() => dispatch(startEdit(item._id))}
          style={{ cursor: 'pointer' }}
        >
          <CardMedia><img src={image} alt="card" /></CardMedia>
          {item.editing && <AdminImageEdit item={item} />}
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

export default connect(mapStateToProps)(AdminImageItem)
