import React, { Component } from 'react'
import { connect } from 'react-redux'

const footerContainer1 = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const {
        business,
        isFetching,
        item
      } = this.props
      const props = {
        business,
        item,
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ brand: { isFetching, footer, business } }) => ({
    business,
    item: footer,
    isFetching
  })
  return connect(mapStateToProps)(Container)
}

export default footerContainer1
