import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import OrderDetail from '../../components/orders/OrderDetail'

const OrderConfirmation = ({ item, isFetching }) => {
  return (
    !isFetching &&
    <section className="page">
      <Card className="card" zDepth={0}>
        <CardTitle title="Order" subtitle={item._id} />
        <CardText>
          Hi {item.firstName}, thank you for your order {item._id}!
        </CardText>
        <OrderDetail order={item} />
      </Card>
    </section>
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
