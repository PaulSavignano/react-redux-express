import React, { Component } from 'react'
import { connect } from 'react-redux'

const textContainer = (ComposedComponent) => {
  class TextContainer extends Component {
    render() {
      const { dispatch, isFetching, item } = this.props
      const props = { dispatch, item }
      return (
        !isFetching && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ texts: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(TextContainer)
}

export default textContainer
