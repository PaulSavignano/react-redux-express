import React from 'react'
import { connect } from 'react-redux'

import OrderCartList from '../../components/orders/OrderCartList'
import formatPrice from '../../utils/formatPrice'

const OrderDetail = ({ isFetching, order, fontFamily }) => {
  const { address, cart } = order
  const { name, phone, street, city, state, zip } = address
  return (
    !isFetching &&
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

const mapStateToProps = ({ products, orders: { isFetching, items }, brand }, { params }) => {
  return {
    isFetching,
    order: items.find(item => item._id === params.orderId),
    fontFamily: brand.theme.fontFamily || null
  }
}

export default connect(mapStateToProps)(OrderDetail)
