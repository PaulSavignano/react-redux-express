import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const addressesContainer = (ComposedComponent) => {
  class AddressesContainer extends Component {
    render() {
      const {
        addresses,
        dispatch,
        isFetching,
      } = this.props
      const props = {
        addresses,
        dispatch,
      }
      return (
        isFetching ? null :  <ComposedComponent {...props} />
      )
    }
  }
  AddressesContainer.propTypes = {
    addresses: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(
    ({ addresses: { isFetching, items }}) => ({
      addresses: items,
      isFetching
    })
  )(AddressesContainer)
}

export default addressesContainer
