import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import ordersContainer from '../../containers/orders/ordersContainer'
import AdminOrderItem from './AdminOrderItem'

const AdminOrderPage = ({ dispatch, orders }) => (
  <Card className="section page" zDepth={0}>
    <CardTitle title="Orders"/>
    {!orders.length ? <CardText>You do not have any orders yet</CardText> :
    orders.map(order => (
      <AdminOrderItem
        dispatch={dispatch}
        key={order._id}
        order={order}
      />
    ))}
  </Card>
)

AdminOrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
}

export default ordersContainer(AdminOrderPage)
