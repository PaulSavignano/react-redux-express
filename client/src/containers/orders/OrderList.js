import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import OrderItem from '../../components/orders/OrderItem'

const OrderList = ({ isFetching, orders }) => (
  !isFetching &&
  <Card>
    <CardTitle title="Orders"/>
    {!orders.length ? <CardText>You do not have any orders yet</CardText> :
    orders.map(order => (
      <OrderItem
        key={order._id}
        order={order}
      />
    ))}
  </Card>
)

const mapStateToProps = ({ orders: { isFetching, items }}) => ({
  isFetching,
  orders: items,
})

export default connect(mapStateToProps)(OrderList)
