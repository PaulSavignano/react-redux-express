import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdateCart } from '../../actions/cart'
import formatPrice from '../../utils/formatPrice'

class CartItem extends Component {
  state = {
    qty: null,
    image: null,
    loading: false,
    zDepth: 1
  }
  componentWillMount() {
    const { image, productQty } = this.props.item
    this.setState({ qty: productQty })
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  add = (e, dispatch, productId) => {
    e.stopPropagation()
    const newQty = this.state.qty + 1
    this.setState({ qty: newQty })
    const update = { type: 'ADD_TO_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  minus = (e, dispatch, productId) => {
    e.stopPropagation()
    const newQty = this.state.qty - 1
    this.setState({ qty: newQty })
    const update = { type: 'REDUCE_FROM_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  render() {
    const { image, loading } = this.state
    const { dispatch, item: { productId, name, price, total }, product} = this.props
    const navToSlug = product && { onTouchTap: () => dispatch(push(`/${product.slug}`)) }
    return (
      !loading &&
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ margin: 16 }}
        containerStyle={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start'}}
        {...navToSlug}
      >
        {image && <CardMedia style={{ flex: '1 1 100px'}}><img src={image} alt="" /></CardMedia>}
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
            <div style={{ flex: '1 1 40px', width: 40, textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)', minWidth: 50, marginRight: 0 }}>
              {this.state.qty}
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
  product: items.find(i => i._id === item.productId)
})

export default connect(mapStateToProps)(CartItem)
