import React from 'react'
import { connect } from 'react-redux'

import OrderDetail from '../../components/orders/OrderDetail'

const OrderDetailPage = ({ isFetching, order }) => (
  !isFetching && <OrderDetail order={order} />
)

const mapStateToProps = ({
  orders: { items, isFetching }
}, {
  params: { orderId }
}) => ({
  isFetching,
  order: items.find(item => item._id === orderId)
})


export default connect(mapStateToProps)(OrderDetailPage)
