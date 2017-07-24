import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import OrderItem from '../../components/orders/OrderItem'

const OrderList = ({ isFetching, items }) => (
  !isFetching &&
  <Card className="section">
    <CardTitle title="Orders"/>
    {!items.length ? <CardText>You do not have any orders yet</CardText> :
    items.map(item => (
      <OrderItem
        key={item._id}
        item={item}
      />
    ))}
  </Card>
)

const mapStateToProps = ({ orders: { isFetching, items }}) => ({
  isFetching,
  items
})

export default connect(mapStateToProps)(OrderList)
