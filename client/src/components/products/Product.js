import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import history from '../../containers/routers/history'
import productContainer from '../../containers/products/productContainer'
import ProductButtons from './ProductButtons'
import formatPrice from '../../utils/formatPrice'
import slugIt from '../../utils/slugIt'

class Product extends Component {
  handleNavigation = () => {
    const { item: { _id, values: { name }}} = this.props
    history.push(`/products/${slugIt(name)}/${_id}`)
  }
  render() {
    const {
      dispatch,
      elevation,
      events,
      item: {
        _id,
        image,
        values: {
          description,
          name,
          price,
        }
      },
      primary1Color,
      productStyle: {
        values: {
          descriptionColor,
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
          <CardMedia onTouchTap={this.handleNavigation}>
            <img src={image.src} alt={name} />
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
          primary1Color={primary1Color}
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
