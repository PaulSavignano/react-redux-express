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
        editItem,
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
        editItem,
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
    brand: { isFetching, productStyle, typography },
    editItem
  }, {
    item: { values, image }
  }) => ({
    productStyle,
    editItem: editItem.kind === 'PRODUCT_SECTION' || editItem.kind === 'PRODUCT' ? editItem : null,
    isFetching,
    item,
    typography
  })
  ProductContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editItem: PropTypes.object,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    productStyle: PropTypes.object.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ProductContainer)
}

export default productContainer
