import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle } from 'material-ui/Card'

import AdminOrderList from './AdminOrderList'

const AdminOrders = ({ isFetching, items, fontFamily, color }) => {
  return (
    !isFetching &&
    <Card className="section">
      <CardTitle title="Orders" />
      <AdminOrderList orders={items} />
    </Card>
  )
}

const mapStateToProps = ({ orders: { isFetching, items }}) => ({
  isFetching,
  items,
})

export default connect(mapStateToProps)(AdminOrders)
