import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
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
        values: {
          descriptionColor,
          detailColor,
          flex,
          nameColor,
          nameTextShadow,
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
        className="product"
      >
        {image.src &&

          <CardMedia onTouchTap={() => dispatch(push(`/products/${productSlug}`))}>
            <CSSTransitionGroup
              transitionName="image"
              transitionAppear={true}
              transitionAppearTimeout={600}
              transitionEnter={false}
              transitionLeave={false}
            >
              <img src={image.src} alt={name} />
            </CSSTransitionGroup>
          </CardMedia>
        }
        <CardTitle title={
          <div
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'space-between',
              color: nameColor,
              textShadow: nameTextShadow
            }}
          >
            <div>{name}</div>
            <div>{formatPrice(price)}</div>
          </div>
        }
        />
        <CardText
          style={{
            color: descriptionColor,
          }}
        >
          {description}
        </CardText>
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
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default productContainer(Product)
