import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import { Card, CardTitle } from 'material-ui/Card'

import formatPrice from '../../modules/formatPrice'

class AdminOrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, order } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => dispatch(push(`/admin/orders/${order._id}`))}
        className="cards"
      >
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>Order {order._id}</div>
            <div>{formatPrice(order.cart.total)}</div>
            <div>{moment(order.shipDate).format("dddd, MMMM Do YYYY, h:mm a")}</div>
          </div>
        }
        />
      </Card>
    )
  }
}


export default connect()(AdminOrderItem)
