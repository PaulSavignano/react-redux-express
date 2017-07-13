import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardText } from 'material-ui/Card'
import moment from 'moment'

import formatPrice from '../../utils/formatPrice'
import OrderCartList from './OrderCartList'

class OrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const {
      dispatch,
      order: {
        _id,
        cart: { items },
        createdAt,
        address: { name },
        total
      }
    } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => dispatch(push(`/user/orders/${_id}`))}
        className="cards"
      >
        <CardText style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
          <div>
            <div>Order Placed</div>
            <div>{moment(createdAt).format("YYYY-MM-DD, h:mm a")}</div>
          </div>
          <div>
            <div>Total</div>
            <div>{formatPrice(total)}</div>
          </div>
          <div>
            <div>Ship To</div>
            <div>{name}</div>
          </div>
          <div>
            <div>Order #</div>
            <div>{_id}</div>
          </div>
        </CardText>
        <OrderCartList items={items} />
      </Card>
    )
  }
}


export default connect()(OrderItem)
