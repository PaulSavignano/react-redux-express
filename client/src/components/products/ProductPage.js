import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'
import productPageContainer from '../../containers/products/productPageContainer'
import loadImage from '../images/loadImage'
import ProductButtons from './ProductButtons'

const ProductPage = ({
  dispatch,
  item: {
    _id,
    image,
    values: { description, detail, name, price }
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
}) => (
  <Paper
    className="section page flex-row"
    zDepth={0}
    id={_id}
  >
    <div style={{ display: 'flex', flexFlow: 'row wrap'}}>
      <Paper zDepth={3} style={{ flex: `2 1 300px`, margin: '0 0 16px' }}>
        <CardMedia><img src={image.src} alt={name} /></CardMedia>
      </Paper>
      <Card style={{ flex: '1 1 300px', margin: '8px 16px' }} zDepth={0}>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
          <CardTitle
            title={name}
            titleColor={nameColor}
            titleStyle={nameTextShadow}
            subtitle={description}
            subtitleColor={descriptionColor}
          />
          <CardTitle title={formatPrice(price)} />
        </div>
        <CardText style={{ color: detailColor }}>{renderHTML(detail)}</CardText>
        <CardActions>
          <ProductButtons
            dispatch={dispatch}
            form={`addToCard_${_id}`}
            productId={_id}
          />
        </CardActions>
      </Card>
    </div>
  </Paper>
)


export default productPageContainer(loadImage(ProductPage))
