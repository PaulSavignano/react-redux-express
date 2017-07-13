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
          <RaisedButton
            label={shipped ? 'Shipped' : 'Ship'}
            primary={shipped ? false : true}
            onTouchTap={
              !shipped &&
              handleSubmit(() => {
                const update = {
                  type: 'SHIPPED',
                }
                return dispatch(fetchUpdate(_id, update))
              })}
          />
        </CardText>
        <OrderCartList items={items} />
      </Card>
    )
  }
}


export default compose(connect((state, { order }) => ({
  form: `order_${order._id}`
})),
reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminOrderItem)
