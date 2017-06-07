import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import formatPrice from '../../modules/formatPrice'
import OrderCartList from '../components/OrderCartList'

let AdminOrderDetail = ({ error, handleSubmit, dispatch, isFetching, order, fontFamily }) => {
  return (
    isFetching ? null :
    <section>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', margin: 16, alignItems: 'center'}}>
        <div style={{ fontFamily, fontSize: 32 }}>Order {order._id}</div>
        <RaisedButton
          label={order.shipped ? 'Shipped' : 'Ship'}
          primary={order.shipped ? false : true}
          onTouchTap={
            order.shipped ? null :
            handleSubmit(values => {
              const update = {
                type: 'SHIPPED',
              }
              dispatch(fetchUpdate(order._id, update))
            })}
        />
      </div>

      <OrderCartList items={order.cart.items} />
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
        <h2 style={{ margin: '16px 16px 4px 16px' }}>Subtotal {formatPrice(order.cart.subTotal)}</h2>
        <h2 style={{ margin: '4px 16px' }}>Tax {(order.cart.tax * 100).toFixed(2)}%</h2>
        <h2 style={{ margin: '4px 16px' }}>Total {formatPrice(order.cart.total)}</h2>
      </div>
    </section>
  )
}

AdminOrderDetail = compose(
  connect((state, ownProps) => ({
    form: `order_${ownProps.params.orderId}`,
    isFetching: state.orders.isFetching,
    order: state.orders.items.find(item => item._id === ownProps.params.orderId),
    fontFamily: state.brand.values.fontFamily || null
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminOrderDetail)


export default AdminOrderDetail
