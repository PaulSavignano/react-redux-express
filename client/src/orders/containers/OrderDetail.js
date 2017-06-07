import React from 'react'
import { connect } from 'react-redux'

import formatPrice from '../../modules/formatPrice'
import OrderCartList from '../components/OrderCartList'

const OrderDetail = ({ isFetching, order, fontFamily }) => {
  const { address, cart } = order
  const { name, phone, street, city, state, zip } = address
  return (
    isFetching ? null :
    <section>
      <h1 style={{ fontFamily }}>Order {order._id}</h1>
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

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.products.isFetching,
    order: state.orders.items.find(item => item._id === ownProps.params.orderId),
    fontFamily: state.brand.values.fontFamily || null
  }
}

export default connect(mapStateToProps)(OrderDetail)
