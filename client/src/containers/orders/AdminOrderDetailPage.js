import React from 'react'
import { connect } from 'react-redux'

import AdminOrderDetail from './AdminOrderDetail'

const AdminOrderDetailPage = ({ isFetching, order }) => (
  !isFetching && <AdminOrderDetail order={order} />
)

const mapStateToProps = ({
  orders: { items, isFetching }
}, {
  params: { orderId }
}) => ({
  isFetching,
  order: items.find(item => item._id === orderId),
  orderId
})

export default connect(mapStateToProps)(AdminOrderDetailPage)
