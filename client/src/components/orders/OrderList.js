import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import OrderItem from '../../components/orders/OrderItem'

const OrderList = ({ dispatch, orders }) => (
  <Card className="OrderList">
    <CardTitle title="Orders"/>
    {!orders.length ?
      <CardText>You do not have any orders yet</CardText>
    :
    orders.map(order => (
      <OrderItem
        dispatch={dispatch}
        key={order._id}
        order={order}
      />
    ))}
  </Card>
)

OrderList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
}

export default OrderList
