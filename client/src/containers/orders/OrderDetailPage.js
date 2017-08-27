import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OrderDetail from '../../components/orders/OrderDetail'

const OrderDetailPage = ({ isFetching, order }) => (
  !isFetching &&
  <section className="page-height section-width">
    <OrderDetail order={order} />
  </section>
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
