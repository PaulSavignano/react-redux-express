import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import AdminOrderItem from './AdminOrderItem'

const AdminOrderList = ({ orders, fontFamily, color }) => {
  return (
    !orders.length ? <CardText>You have no orders yet</CardText> :
    <div>
      {orders.map(order => (
        <AdminOrderItem
          key={order._id}
          order={order}
        />
      ))}
    </div>
  )
}



export default AdminOrderList
