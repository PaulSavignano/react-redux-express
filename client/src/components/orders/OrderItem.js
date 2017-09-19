import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardText } from 'material-ui/Card'
import moment from 'moment'

import history from '../../containers/routers/history'
import formatPrice from '../../utils/formatPrice'
import OrderCartList from './OrderCartList'

class OrderItem extends Component {
  state = {
    elevation: 1,
  }
  handleMouseEnter = () => this.setState({ elevation: 3 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleNavigation = () => {
    const { order: { _id }} = this.props
    return history.push(`/user/orders/${_id}`)
  }
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
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleNavigation}
        className="card"
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
        <OrderCartList
          dispatch={dispatch}
          items={items}
        />
      </Card>
    )
  }
}

OrderItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default OrderItem
