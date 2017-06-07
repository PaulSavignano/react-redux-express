import React from 'react'

import AdminOrderItem from './AdminOrderItem'

const AdminOrderList = ({ orders, fontFamily, color }) => {
  return (
    !orders.length ? <h3 style={{ fontFamily, color }}>No orders yet</h3> :
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
