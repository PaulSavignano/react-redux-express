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
        item
      } = this.props
      const events = {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        dispatch,
        item,
        elevation,
        events
      }
      return (
        !isFetching && item ? <ComposedComponent {...props} /> : null
      )
    }
  }
  const mapStateToProps = ({ products: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  ProductContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(ProductContainer)
}

export default productContainer
