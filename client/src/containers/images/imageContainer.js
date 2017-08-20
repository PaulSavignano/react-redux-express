import React, { Component } from 'react'
import { connect } from 'react-redux'

const imageContainer = (ComposedComponent) => {
  class ImageContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const props = {
        dispatch,
        item,
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ images: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(ImageContainer)
}

export default imageContainer
