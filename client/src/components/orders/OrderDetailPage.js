import React from 'react'
import PropTypes from 'prop-types'

import './orders.css'
import orderContainer from '../../containers/orders/orderContainer'
import OrderDetail from '../../components/orders/OrderDetail'

const OrderDetailPage = ({ dispatch, order }) => (
  <div className="page">
    <section className="section">
      <OrderDetail
        dispatch={dispatch}
        order={order}
      />
    </section>
  </div>
)

OrderDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default orderContainer(OrderDetailPage)
