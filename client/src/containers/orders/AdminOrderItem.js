import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'

import formatPrice from '../../utils/formatPrice'
import OrderCartList from '../../components/orders/OrderCartList'
import { fetchUpdate } from '../../actions/orders'

class AdminOrderItem extends Component {
  state = {
    zDepth: 1,
  }
  handleShipOrder = (e) =>  {
    const { shipped, dispatch, handleSubmit, order: { _id } } = this.props
    e.stopPropagation()
    if (!shipped) return dispatch(fetchUpdate(_id, { type: 'SHIPPED' }))
    return
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const {
      dispatch,
      handleSubmit,
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
        onTouchTap={() => dispatch(push(`/user/orders/${_id}`))}
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
          <CardText style={{ flex: '1 1 auto', display: 'flex' }}>
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

        <OrderCartList items={items} />
      </Card>
    )
  }
}


export default compose(connect((state, { order }) => ({
  form: `order_${order._id}`
})),
reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminOrderItem)
