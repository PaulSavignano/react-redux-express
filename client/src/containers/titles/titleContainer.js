import React, { Component } from 'react'
import { connect } from 'react-redux'

const titleContainer = (ComposedComponent) => {
  class TitleContainer extends Component {
    render() {
      const { isFetching, item } = this.props
      const props = { item }
      return (
        !isFetching && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ titles: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(TitleContainer)
}

export default titleContainer
