import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OrderDetail from '../../components/orders/OrderDetail'

const OrderDetailPage = ({ isFetching, order }) => (
  !isFetching &&
  <div className="page">
    <section className="section-margin">
      <OrderDetail order={order} />
    </section>
  </div>
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
