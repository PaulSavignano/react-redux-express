import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import loadImage from '../../components/images/loadImage'
import { fetchUpdateCart } from '../../actions/cart'
import formatPrice from '../../utils/formatPrice'
import slugIt from '../../utils/slugIt'

class CartItem extends Component {
  state = {
    elevation: 1
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleAdd = (e) => {
    e.stopPropagation()
    const { dispatch, item: { productId }} = this.props
    const update = { type: 'ADD_TO_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  handleMinus = (e) => {
    e.stopPropagation()
    const { dispatch, item: { productId }} = this.props
    const update = { type: 'REDUCE_FROM_CART', productId, productQty: 1 }
    dispatch(fetchUpdateCart(update))
  }
  handleRemove = (e) => {
    e.stopPropagation()
    const { dispatch, item: { productId }} = this.props
    const update = { type: 'REMOVE_FROM_CART', productId }
    dispatch(fetchUpdateCart(update))
  }
  handleNavToProduct = () => {
    const { history, item: { name, productId }} = this.props
    return history.push(`/products/${slugIt(name)}/${productId}`)
  }
  render() {
    const {
      item: {
        image,
        name,
        price,
        productQty,
        total
      }
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ margin: 16 }}
        containerStyle={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start'}}
        onTouchTap={this.handleNavToProduct}
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
            <RaisedButton label="-" primary={true} onTouchTap={this.handleMinus} labelStyle={{ fontSize: 24 }} style={{ marginRight: 0 }} />
            <div style={{ flex: '1 1 40px', width: 40, textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)', minWidth: 50, marginRight: 0, fontSize: 14 }}>
              {productQty}
            </div>
            <RaisedButton label="+" primary={true} onTouchTap={this.handleAdd} labelStyle={{ fontSize: 24 }} style={{ marginLeft: 0 }} />
            <RaisedButton
              style={{ margin: '0 0 0 8px'}}
              labelStyle={{ fontSize: 14 }}
              label="X"
              primary={true}
              onTouchTap={this.handleRemove}
            />
          </CardActions>
          <CardText style={{ flex: '1 1 auto', textAlign: 'right' }}>{formatPrice(total)}</CardText>
        </div>
      </Card>
    )
  }
}

CartItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default withRouter(loadImage(CartItem))
