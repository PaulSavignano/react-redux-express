import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardTitle } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'

class OrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, order: { _id, cart: { total }}} = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => dispatch(push(`/user/orders/${_id}`))}
        className="cards"
      >
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>Order {_id}</div>
            <div>{formatPrice(total)}</div>
          </div>
        }
        />
      </Card>
    )
  }
}


export default connect()(OrderItem)
