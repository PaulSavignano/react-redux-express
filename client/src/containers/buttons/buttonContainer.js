import React, { Component } from 'react'
import { connect } from 'react-redux'

const buttonContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { dispatch, isFetching, item } = this.props
      const props = { dispatch, item }
      return (
        !isFetching && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ buttons: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(Container)
}

export default buttonContainer
