import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import productContainer from './productContainer'
import loadImage from '../images/loadImage'
import ProductButtons from './ProductButtons'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import formatPrice from '../../utils/formatPrice'
import { fetchAddToCart } from '../../actions/cart'

class ProductItem extends Component {
  state = {
    qty: 1
  }
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
  render() {
    const {
      dispatch,
      events,
      item: {
        _id,
        image,
        productSlug,
        values: {
          margin,
          width,
          name,
          description,
          price
        }
      },
      zDepth
    } = this.props
    return (
      <Card
        {...events}
        zDepth={zDepth}
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

export default productContainer(loadImage(ProductItem))