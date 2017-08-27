import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const brandContainer = (ComposedComponent) => {
  class BrandContainer extends Component {
    render() {
      const {
        brand,
        dispatch,
        isFetching
      } = this.props
      const props = {
        brand,
        dispatch
      }
      return (
        isFetching ? null :
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ brand }) => ({ brand })
  BrandContainer.propTypes = {
    brand: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  return connect(mapStateToProps)(BrandContainer)
}

export default brandContainer
