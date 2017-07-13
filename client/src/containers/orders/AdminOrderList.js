import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import AdminOrderItem from './AdminOrderItem'

const AdminOrderList = ({ isFetching, orders }) => (
  !isFetching &&
  <div>
    <br/>
    <Card className="section">
      <CardTitle title="Orders"/>
      {!orders.length ? <CardText>You do not have any orders yet</CardText> :
      orders.map(order => (
        <AdminOrderItem
          key={order._id}
          order={order}
        />
      ))}
    </Card>
  </div>

)

const mapStateToProps = ({ orders: { isFetching, items }}) => ({
  isFetching,
  orders: items,
})

export default connect(mapStateToProps)(AdminOrderList)
