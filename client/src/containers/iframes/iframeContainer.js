import React, { Component } from 'react'
import { connect } from 'react-redux'

const iframeContainer = (ComposedComponent) => {
  class IframeContainer extends Component {
    state = {
      elevation: null
    }
    componentWillMount() {
      const { values } = this.props.item
      if (values.elevation) this.setState({ elevation: values.elevation })
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    render() {
      const { elevation } = this.state
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const props = {
        dispatch,
        item,
        elevation,
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ iframes: { items, isFetching }}, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  return connect(mapStateToProps)(IframeContainer)
}

export default iframeContainer
