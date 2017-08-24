import React, { Component } from 'react'
import PropTypes from 'prop-types'

import productContainer from '../../containers/cards/productContainer'
import Product from './Product'

class ProductSection extends Component {
  render() {
    const {
      productStyle,
      cursor,
      editItem,
      events,
      hasButtons,
      hasHeading,
      hasMedia,
      hasParagraph,
      item: {
        _id,
        cards,
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
      >
        {cards.map(card => (
          <Product
            productStyle={productStyle}
            cursor={cursor}
            events={events}
            hasButtons={hasButtons}
            hasHeading={hasHeading}
            hasMedia={hasMedia}
            hasParagraph={hasParagraph}
            item={card}
          />
        ))}
      </section>
    )
  }
}

ProductSection.propTypes = {
  productStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default productContainer(ProductSection)
