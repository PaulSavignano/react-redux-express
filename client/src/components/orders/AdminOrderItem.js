import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'

import history from '../../containers/routers/history'
import formatPrice from '../../utils/formatPrice'
import OrderCartList from '../../components/orders/OrderCartList'
import { fetchUpdate } from '../../actions/orders'

class AdminOrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleShipOrder = (e) =>  {
    e.stopPropagation()
    const { shipped, dispatch, order: { _id }} = this.props
    if (!shipped) return dispatch(fetchUpdate(_id, { type: 'SHIPPED' }))
    return
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
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
        shipped,
        shipDate,
        total
      }
    } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleNavigation}
        className="card"
      >
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
          <CardText style={{ flex: '2 2 auto' }}>
            <div>Order Placed</div>
            <div>{moment(createdAt).format("YYYY-MM-DD, h:mm a")}</div>
          </CardText>
          <CardText style={{ flex: '2 2 auto' }}>
            <div>Total</div>
            <div>{formatPrice(total)}</div>
          </CardText>
          <CardText style={{ flex: '2 2 auto' }}>
            <div>Ship To</div>
            <div>{name}</div>
          </CardText>
          {shipped &&
            <CardText style={{ flex: '2 2 auto' }}>
              <div>Ship Date</div>
              <div>{moment(shipDate).format("YYYY-MM-DD, h:mm a")}</div>
            </CardText>
          }
          <CardText style={{ flex: '2 2 auto' }}>
            <div>Order #</div>
            <div>{_id}</div>
          </CardText>
          <CardText style={{ flex: '0 1 auto', display: 'flex' }}>
            <form>
              <RaisedButton
                label={shipped ? 'Shipped' : 'Mark Ship'}
                primary={shipped ? false : true}
                onTouchTap={this.handleShipOrder}
                style={{ flex: '1 1 auto'}}
              />
            </form>
          </CardText>
        </div>
        <OrderCartList
          dispatch={dispatch}
          items={items}
        />
      </Card>
    )
  }
}

AdminOrderItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default AdminOrderItem
