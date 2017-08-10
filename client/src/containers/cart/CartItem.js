import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import loadImage from '../images/loadImage'
import { fetchUpdateCart } from '../../actions/cart'
import formatPrice from '../../utils/formatPrice'

class CartItem extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  add = (e, dispatch, productId) => {
    e.stopPropagation()
    const update = { type: 'ADD_TO_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  minus = (e, dispatch, productId) => {
    e.stopPropagation()
    const update = { type: 'REDUCE_FROM_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  render() {
    const {
      dispatch,
      item: {
        image,
        name,
        price,
        productQty,
        productId,
        total
      },
      product
    } = this.props
    const navToPage = product && { onTouchTap: () => dispatch(push(`/products/${product.productSlug}`)) }
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ margin: 16 }}
        containerStyle={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start'}}
        {...navToPage}
      >
        {image && image.src && <CardMedia style={{ flex: '1 1 100px'}}><img src={image.src} alt="" /></CardMedia>}
        <div style={{ flex: '6 6 auto', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
          <CardText>{name}</CardText>
          <div style={{ flex: '6 6 auto' }}></div>
          <CardText>{formatPrice(price)}</CardText>
          <CardActions style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            flex: '1 1 auto',
            alignItems: 'center'
          }}>
            <RaisedButton label="-" primary={true} onTouchTap={(e) => this.minus(e, dispatch, productId)} labelStyle={{ fontSize: 24 }} style={{ marginRight: 0 }} />
            <div style={{ flex: '1 1 40px', width: 40, textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)', minWidth: 50, marginRight: 0, fontSize: 14 }}>
              {productQty}
            </div>
            <RaisedButton label="+" primary={true} onTouchTap={(e) => this.add(e, dispatch, productId)} labelStyle={{ fontSize: 24 }} style={{ marginLeft: 0 }} />
            <RaisedButton
              style={{ margin: '0 0 0 8px'}}
              labelStyle={{ fontSize: 14 }}
              label="X"
              primary={true}
              onTouchTap={(e) => {
                e.stopPropagation()
                const update = { type: 'REMOVE_FROM_CART', productId }
                dispatch(fetchUpdateCart(update))
              }}
            />
          </CardActions>
          <CardText style={{ flex: '1 1 auto', textAlign: 'right' }}>{formatPrice(total)}</CardText>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = ({ products: { items }}, { item }) => ({
  item: { ...item, image: item.image },
  product: items.find(i => i._id === item.productId)
})

export default connect(mapStateToProps)(loadImage(CartItem))
