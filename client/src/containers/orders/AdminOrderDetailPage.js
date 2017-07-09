import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AdminOrderDetail from './AdminOrderDetail'

const AdminOrderDetailPage = ({ isFetching, order }) => (
  !isFetching && <AdminOrderDetail order={order} />
)

const mapStateToProps = ({
  orders: { items, isFetching }
}, {
  params: { orderId }
}) => ({
  isFetching,
  order: items.find(item => item._id === orderId),
  orderId
})

export default connect(mapStateToProps)(AdminOrderDetailPage)
