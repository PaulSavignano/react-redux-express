import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import OrderDetail from '../../components/orders/OrderDetail'

const OrderConfirmation = ({ item, isFetching }) => {
  return (
    !isFetching &&
    <div className="page">
      <section className="section-margin">
        <Card className="card" zDepth={0}>
          <CardTitle title="Order" subtitle={item._id} />
          <CardText>
            Hi {item.firstName}, thank you for your order {item._id}!
          </CardText>
          <OrderDetail order={item} />
        </Card>
      </section>
    </div>
  )
}

const mapStateToProps = ({
  orders: { items, isFetching }
}, {
  params: { orderId }
}) => {
  return {
    item: items.find(i => i._id === orderId),
    isFetching
  }
}


export default connect(mapStateToProps)(OrderConfirmation)
