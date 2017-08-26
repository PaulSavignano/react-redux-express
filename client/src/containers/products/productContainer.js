import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const productContainer = (ComposedComponent) => {
  class ProductContainer extends Component {
    state = {
      elevation: 1
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    render() {
      const { elevation } = this.state
      const {
        dispatch,
        isFetching,
        item,
        productStyle
      } = this.props
      const events = {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        dispatch,
        item,
        elevation,
        events,
        productStyle
      }
      return (
        !isFetching && item ? <ComposedComponent {...props} /> : null
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, productStyle, typography }
  }, {
    item
  }) => ({
    productStyle,
    isFetching,
    item,
    typography
  })
  ProductContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    productStyle: PropTypes.object.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ProductContainer)
}

export default productContainer
