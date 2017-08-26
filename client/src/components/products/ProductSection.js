import React, { Component } from 'react'
import PropTypes from 'prop-types'

import productContainer from '../../containers/products/productContainer'
import Product from './Product'

class ProductSection extends Component {
  render() {
    const {
      item: {
        _id,
        items,
        values: {
          backgroundColor,
          pageLink,
        }
      }
    } = this.props
    return (
      <section
        id={pageLink}
        style={{ backgroundColor }}
        onTouchTap={this.handleStartEdit}
        className="product-section"
      >
        {items.map(item => (
          <Product
            item={item}
          />
        ))}
      </section>
    )
  }
}

ProductSection.propTypes = {
  item: PropTypes.object.isRequired
}

export default ProductSection
