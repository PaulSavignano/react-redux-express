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
          margin,
          name,
          price,
        }
      },
    } = this.props
    return (
      <Card
        {...events}
        zDepth={elevation}
        style={{ margin }}
        id={_id}
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
        <ProductButtons _id={_id} dispatch={dispatch}/>
      </Card>
    )
  }
}

export default loadImage(Product)
