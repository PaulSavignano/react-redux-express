import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import './product.css'
import history from '../../containers/routers/history'
import productContainer from '../../containers/products/productContainer'
import ProductContent from './ProductContent'
import slugIt from '../../utils/slugIt'

class Product extends Component {
  handleNavigation = (e) => {
    const { item: { _id, values: { name }}} = this.props
    e.stopPropagation()
    history.push(`/products/${slugIt(name)}/${_id}`)
  }
  render() {
    const {
      elevation,
      events,
      item: {
        _id
      },
      primary1Color,
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
        style={{ flex, margin }}
        id={_id}
        onTouchTap={this.handleNavigation}
        className="product"
      >
        <ProductContent {...this.props} />
      </Card>
    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default productContainer(Product)
