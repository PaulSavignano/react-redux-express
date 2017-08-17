import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const brandContainer = (ComposedComponent) => {
  const BrandContainer = ({ brand }) => (
    brand.isFetching ? null :
    <ComposedComponent {...brand} />
  )
  const mapStateToProps = ({ brand }) => ({ brand })
  BrandContainer.propTypes = {
    brand: PropTypes.object.isRequired,
  }
  return connect(mapStateToProps)(BrandContainer)
}

export default brandContainer
