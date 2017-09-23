import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './product.css'
import productContainer from '../../containers/products/productContainer'
import ProductContent from './ProductContent'
import { startEdit } from '../../actions/editItem'

class AdminProduct extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'PRODUCT' }))
  }
  render() {
    const {
      elevation,
      events,
      productStyle: {
        values: {
          flex,
          margin,
        }
      }
    } = this.props
    return (
      <Card
        {...events}
        zDepth={elevation}
        onTouchTap={this.handleStartEdit}
        style={{ flex, margin }}
        className="admin-product"
      >
        <ProductContent {...this.props} />
      </Card>
    )
  }
}

AdminProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default productContainer(AdminProduct)
