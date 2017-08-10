import React from 'react'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'
import productPageContainer from './productPageContainer'
import loadImage from '../images/loadImage'
import ProductButtons from './ProductButtons'

const ProductPage = ({
  item: {
    _id,
    image,
    values: { description, detail, name, price }
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
          <CardTitle title={name} subtitle={description} />
          <CardTitle title={formatPrice(price)} />
        </div>
        <CardText>{renderHTML(detail)}</CardText>
        <CardActions><ProductButtons _id={_id}/></CardActions>
      </Card>
    </div>
  </Paper>
)


export default productPageContainer(loadImage(ProductPage))
