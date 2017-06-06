import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdateCart } from '../actions/index'
import formatPrice from '../../modules/formatPrice'

class CartItem extends Component {
  state = {
    qty: this.props.productQty,
    src: '',
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  add = () => {
    const newQty = this.state.qty + 1
    this.setState({ qty: newQty })
    const update = { type: 'ADD_TO_CART', productId: this.props.productId, productQty: 1 }
    this.props.dispatch(fetchUpdateCart(update))
  }
  minus = () => {
    const newQty = this.state.qty - 1
    this.setState({ qty: newQty })
    const update = { type: 'REDUCE_FROM_CART', productId: this.props.productId, productQty: 1 }
    this.props.dispatch(fetchUpdateCart(update))
  }
  render() {
    const { dispatch, productId, name, price, image, total } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
          <img src={image} alt="" width="auto" height="100px"/>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flex: '1 1 auto',
          }}>
            <span style={{ flex: '3 3 auto', minWidth: 200, fontSize: '1.5rem', margin: 16 }}>{name}</span>
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: 16, width: 75 }}>{formatPrice(price)}</span>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              flex: '1 1 auto',
              margin: '16px 8px'
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
                  const update = { type: 'REMOVE_FROM_CART', productId }
                  dispatch(fetchUpdateCart(update))
                }}
              />
            </div>
            <span style={{ flex: '1 1 auto', textAlign: 'right', fontSize: '1.5rem', width: 75, margin: 16 }}>{formatPrice(total)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


export default connect()(CartItem)
