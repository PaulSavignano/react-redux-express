import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const footerContainer = (ComposedComponent) => {
  class FooterContainer extends Component {
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
  FooterContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(FooterContainer)
}

export default footerContainer
