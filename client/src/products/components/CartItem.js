import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQty, minusQty, deleteItem } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
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
  minus = () => {
    const newQty = this.state.qty - 1
    this.setState({ qty: newQty })
    const item = {
      productId: this.props.productId,
      productQty: newQty,
      price: this.props.price,
      total: this.props.price * newQty
    }
    this.props.dispatch(minusQty(item))
  }
  add = () => {
    const newQty = this.state.qty + 1
    this.setState({ qty: newQty })
    const item = {
      productId: this.props.productId,
      productQty: newQty,
      price: this.props.price,
      total: this.props.price * newQty
    }
    console.log(item)
    this.props.dispatch(addQty(item))
  }
  render() {
    const { dispatch, index, productId, productQty, name, price, image, total } = this.props
    return (
      <Card
        style={{ flex: '1 1 auto', height: 100, width: '100%', marginBottom: 8 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
          <img src={this.state.src} alt="" width="100" height="100"/>
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
              <RaisedButton label="-" primary={true} onClick={this.minus} labelStyle={{ fontSize: 24 }} style={{ minWidth: 50 }} />
              <TextField
                style={{ flex: '1 1 auto', width: 50, marginTop: -8 }}
                inputStyle={{ textAlign: 'center'  }}
                value={this.state.qty}
                id={productId}
              />
              <RaisedButton label="+" primary={true} onClick={this.add} labelStyle={{ fontSize: 24 }} style={{ minWidth: 50 }} />
              <RaisedButton
                style={{ margin: '0 8px 0 8px', minWidth: 50 }}
                labelStyle={{ fontSize: 14 }}
                label="X"
                primary={true}
                onClick={() => {
                  dispatch(deleteItem())
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
