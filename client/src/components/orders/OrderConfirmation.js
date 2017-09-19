import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import './orders.css'
import ScrollToTopOnMount from '../routers/ScrollToTopOnMount'
import orderContainer from '../../containers/orders/orderContainer'
import OrderDetail from './OrderDetail'

const OrderConfirmation = ({ dispatch, order }) => {
  return (
    <div className="page">
      <ScrollToTopOnMount/>
      <section className="section-margin">
        <Card className="card" zDepth={0}>
          <CardTitle title="Order" subtitle={order._id} />
          <CardText>
            Hi {order.firstName}, thank you for your order {order._id}!
          </CardText>
          <OrderDetail
            dispatch={dispatch}
            order={order}
          />
        </Card>
      </section>
    </div>
  )
}

OrderConfirmation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default orderContainer(OrderConfirmation)
