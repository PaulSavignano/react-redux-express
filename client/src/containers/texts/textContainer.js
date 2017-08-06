import React, { Component } from 'react'
import { connect } from 'react-redux'

const textContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { isFetching, item } = this.props
      const props = { item }
      return (
        !isFetching && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ texts: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(Container)
}

export default textContainer
