import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startUpdateCart } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import {Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class CartItem extends Component {
  state = {
    qty: this.props.productQty,
    src: '',
    zDepth: 1
  }
  componentWillMount() {
    fetch(`/api/products/images/${this.props.productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ src: json.src }))
      .catch(err => console.log(err))
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
    this.props.dispatch(startUpdateCart({ type: 'ADD_TO_CART', product }))
  }
  minus = () => {
    const newQty = this.state.qty - 1
    this.setState({ qty: newQty })
    const product = { productId: this.props.productId, productQty: 1 }
    this.props.dispatch(startUpdateCart({ type: 'REDUCE_FROM_CART', product }))
  }
  render() {
    const { dispatch, productId, name, price, image, total } = this.props
    return (
      <Card
        style={{ flex: '1 1 auto', height: 100, width: '100%', marginBottom: 8 }}
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
            <span style={{ flex: '3 3 auto', minWidth: 200, fontSize: '1.5rem', margin: '16px 8px 8px 8px' }}>{name}</span>
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: '16px 8px 8px 8px', width: 75 }}>{formatPrice(price)}</span>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              flex: '1 1 auto',
              margin: 8
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
                  dispatch(startUpdateCart({ type: 'REMOVE_FROM_CART', product: { productId } }))
                }}
              />
            </div>
            <span style={{ flex: '1 1 auto', textAlign: 'right', fontSize: '1.5rem', width: 75, margin: '16px 8px 8px 8px' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


export default connect()(CartItem)
