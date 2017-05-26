import React from 'react'
import { connect } from 'react-redux'
import {Card, CardTitle, CardText} from 'material-ui/Card'

const OrderConfirmation = ({ user, item }) => {
  return (
    <section>
      <Card className="cards">
        <CardTitle title="Order" subtitle={item._id} />
        <CardText>
          Hi {user.values.firstName}, thank you for your order {item._id}!
        </CardText>
      </Card>
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  item: state.orders.items.find(order => order._id === ownProps.params.orderId)
})

export default connect(mapStateToProps)(OrderConfirmation)
