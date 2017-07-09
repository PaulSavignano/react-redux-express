import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

const OrderConfirmation = ({ firstName, order }) => {
  return (
    order &&
    <section>
      <Card className="cards">
        <CardTitle title="Order" subtitle={order._id} />
        <CardText>
          Hi {firstName}, thank you for your order {order._id}!
        </CardText>
      </Card>
    </section>
  )
}

const mapStateToProps = ({
  user: { values: { firstName }},
  orders: { items }
}, {
  params: { orderId }
}) => ({
  firstName,
  order: items.find(item => item._id === orderId)
})


export default connect(mapStateToProps)(OrderConfirmation)
