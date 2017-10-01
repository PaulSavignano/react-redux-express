import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'

import H3 from '../typography/H3'
import P from '../typography/P'
import ProductButtons from './ProductButtons'
import formatPrice from '../../utils/formatPrice'

const ProductContent = ({
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
}) => (
  <div>
    {image.src &&
      <CardMedia>
        <img src={image.src} alt={name} />
      </CardMedia>
    }
    <div className="product-content">
      <div
        style={{ color: nameColor, textShadow: nameTextShadow }}
        className="product-heading"
      >
        {name && <H3>{name}</H3>}
        {price && <H3>{formatPrice(price)}</H3>}
      </div>
      {description &&
        <div style={{ color: descriptionColor }} className="product-description">
          <P>{description}</P>
        </div>
      }
    </div>
    <ProductButtons
      dispatch={dispatch}
      form={`addToCard_${_id}`}
      productId={_id}
      primary1Color={primary1Color}
    />
  </div>
)

ProductContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default ProductContent
