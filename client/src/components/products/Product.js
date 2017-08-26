import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import productContainer from '../../containers/products/productContainer'
import loadImage from '../images/loadImage'
import ProductButtons from './ProductButtons'
import formatPrice from '../../utils/formatPrice'

class Product extends Component {
  render() {
    const {
      dispatch,
      elevation,
      events,
      item: {
        _id,
        image,
        productSlug,
        values: {
          description,
          name,
          price,
        }
      },
      productStyle: {
        margin
      }
    } = this.props
    return (
      <Card
        {...events}
        zDepth={elevation}
        style={{ margin }}
        id={_id}
        className="product"
      >
        {image.src &&
          <CardMedia onTouchTap={() => dispatch(push(`/products/${productSlug}`))}>
            <img src={image.src} alt={name} />
          </CardMedia>
        }
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>{name}</div>
            <div>{formatPrice(price)}</div>
          </div>
        }
        />
        <CardText>{description}</CardText>
        <ProductButtons
          dispatch={dispatch}
          form={`addToCard_${_id}`}
          productId={_id}
        />
      </Card>
    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default loadImage(Product)
