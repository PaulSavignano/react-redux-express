import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const footerContainer = (ComposedComponent) => {
  class FooterContainer extends Component {
    render() {
      const {
        business,
        isFetching,
        item,
        primary1Color
      } = this.props
      const props = {
        business,
        item,
        primary1Color
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ brand: { isFetching, footer, business, palette: { primary1Color }}}) => ({
    business,
    item: footer,
    isFetching,
    primary1Color
  })
  FooterContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    primary1Color: PropTypes.string
  }
  return connect(mapStateToProps)(FooterContainer)
}

export default footerContainer
