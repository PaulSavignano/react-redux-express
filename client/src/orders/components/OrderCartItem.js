import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card } from 'material-ui/Card'

import formatPrice from '../../modules/formatPrice'

class OrderCartItem extends Component {
  state = {
    src: '',
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, item } = this.props
    const { productId, productQty, name, price, image, total } = item
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => dispatch(push(`/products/${productId}`))}
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
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: 16, width: 75 }}>
              {productQty}
            </span>
            <span style={{ flex: '1 1 auto', textAlign: 'right', fontSize: '1.5rem', width: 75, margin: 16 }}>{formatPrice(total)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


export default connect()(OrderCartItem)
