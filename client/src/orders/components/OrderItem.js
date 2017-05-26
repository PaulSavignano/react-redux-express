import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardTitle } from 'material-ui/Card'

import formatPrice from '../../modules/formatPrice'

class OrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, item } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => dispatch(push(`/user/orders/${item._id}`))}
        className="cards"
      >
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>Order {item._id}</div>
            <div>{formatPrice(item.cart.total)}</div>
          </div>
        }
        />
      </Card>
    )
  }
}


export default connect()(OrderItem)
