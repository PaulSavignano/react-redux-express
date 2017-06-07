import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import formatPrice from '../../modules/formatPrice'
import OrderCartList from '../components/OrderCartList'

let AdminOrderDetail = ({ error, handleSubmit, dispatch, isFetching, order, fontFamily }) => {
  const { _id, address, cart, shipped } = order
  const { name, phone, street, city, state, zip } = address
  return (
    isFetching ? null :
    <section>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', margin: 16, alignItems: 'center'}}>
        <div style={{ fontFamily, fontSize: 32 }}>Order {_id}</div>
        <RaisedButton
          label={shipped ? 'Shipped' : 'Ship'}
          primary={shipped ? false : true}
          onTouchTap={
            shipped ? null :
            handleSubmit(values => {
              const update = {
                type: 'SHIPPED',
              }
              dispatch(fetchUpdate(_id, update))
            })}
        />
      </div>

      <OrderCartList items={cart.items} />
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
        <div style={{ margin: 16 }}>
          <div>Address</div>
          <div>{name}</div>
          <div>{phone}</div>
          <div>{street}</div>
          <div>{city}, {state} {zip}</div>
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
          <h2 style={{ margin: '16px 16px 4px 16px' }}>Subtotal {formatPrice(cart.subTotal)}</h2>
          <h2 style={{ margin: '4px 16px' }}>Tax {(cart.tax * 100).toFixed(2)}%</h2>
          <h2 style={{ margin: '4px 16px' }}>Total {formatPrice(cart.total)}</h2>
        </div>
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
