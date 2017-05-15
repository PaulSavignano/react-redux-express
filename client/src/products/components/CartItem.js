import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUpdateCart } from '../actions/cart'
import formatPrice from '../../modules/formatPrice'

import {Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class CartItem extends Component {
  state = {
    qty: this.props.productQty,
    src: '',
    zDepth: 1
  }
  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    })
  }
  add = () => {
    const newQty = this.state.qty + 1
    this.setState({ qty: newQty })
    const product = { productId: this.props.productId, productQty: 1 }
    this.props.dispatch(fetchUpdateCart({ type: 'ADD_TO_CART', product }))
  }
  minus = () => {
    const newQty = this.state.qty - 1
    this.setState({ qty: newQty })
    const product = { productId: this.props.productId, productQty: 1 }
    this.props.dispatch(fetchUpdateCart({ type: 'REDUCE_FROM_CART', product }))
  }
  render() {
    const { dispatch, productId, name, price, image, total } = this.props
    return (
      <Card
        style={{ flex: '1 1 auto', margin: '10px 20px' }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
          <img src={image} alt="" width="100" height="100"/>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flex: '1 1 auto',
          }}>
            <span style={{ flex: '3 3 auto', minWidth: 200, fontSize: '1.5rem', margin: '20px 10px 10px 10px' }}>{name}</span>
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: '20px 10px 10px 10px', width: 75 }}>{formatPrice(price)}</span>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              flex: '1 1 auto',
              margin: '15px 10px'
            }}>
              <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: 24 }} style={{ minWidth: 50 }} />
              <TextField
                style={{ flex: '1 1 auto', width: 50, marginTop: -8 }}
                inputStyle={{ textAlign: 'center'  }}
                value={this.state.qty}
                id={productId}
              />
              <RaisedButton label="+" primary={true} onTouchTap={this.add} labelStyle={{ fontSize: 24 }} style={{ minWidth: 50 }} />
              <RaisedButton
                style={{ margin: '0 8px 0 8px', minWidth: 50 }}
                labelStyle={{ fontSize: 14 }}
                label="X"
                primary={true}
                onTouchTap={() => {
                  dispatch(fetchUpdateCart({ type: 'REMOVE_FROM_CART', product: { productId } }))
                }}
              />
            </div>
            <span style={{ flex: '1 1 auto', textAlign: 'right', fontSize: '1.5rem', width: 75, margin: '20px 10px 10px 10px' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


export default connect()(CartItem)
