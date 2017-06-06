import React from 'react'
import { connect } from 'react-redux'

import formatPrice from '../../modules/formatPrice'
import OrderCartList from '../components/OrderCartList'

const OrderDetail = ({ isFetching, item, fontFamily }) => {
  return (
    isFetching ? null :
    <section>
      <h1 style={{ fontFamily }}>Order {item._id}</h1>
      <OrderCartList items={item.cart.items} />
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
        <h2 style={{ margin: '16px 16px 4px 16px' }}>Subtotal {formatPrice(item.cart.subTotal)}</h2>
        <h2 style={{ margin: '4px 16px' }}>Tax {(item.cart.tax * 100).toFixed(2)}%</h2>
        <h2 style={{ margin: '4px 16px' }}>Total {formatPrice(item.cart.total)}</h2>
      </div>
    </section>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.products.isFetching,
    item: state.orders.items.find(item => item._id === ownProps.params.orderId),
    fontFamily: state.brand.values.fontFamily || null
  }
}

export default connect(mapStateToProps)(OrderDetail)
