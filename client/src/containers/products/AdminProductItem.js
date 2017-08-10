import React from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import productContainer from './productContainer'
import loadImage from '../images/loadImage'
import AdminProductEdit from './AdminProductEdit'
import formatPrice from '../../utils/formatPrice'
import { startEdit } from '../../actions/products'

const AdminProductItem = ({
  dispatch,
  events,
  item,
  zDepth
}) => {
  const {
    _id,
    editing,
    image,
    values: {
      description,
      margin,
      name,
      price,
    }
  } = item
  return (
    <Card
      {...events}
      zDepth={zDepth}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ margin }}
      id={_id}
    >
      {image.src &&
        <CardMedia>
          <img src={image.src} alt="section product" />
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
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
        <RaisedButton label="-" primary={true} labelStyle={{ fontSize: '24px' }} />
        <TextField
          style={{ flex: '1 1 auto' }}
          inputStyle={{ textAlign: 'center' }}
          value="1"
          id={_id}
        />
        <RaisedButton label="+" primary={true} labelStyle={{ fontSize: '24px' }} />
      </div>
      <RaisedButton
        label="Add To Cart"
        primary={true}
        fullWidth={true}
      />
      {editing && <AdminProductEdit item={item} /> }
    </Card>
  )
}

export default productContainer(loadImage(AdminProductItem))
