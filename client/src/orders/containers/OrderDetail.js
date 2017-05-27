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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Total</h1>
        <h1>{formatPrice(item.cart.total)}</h1>
      </div>
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  item: state.orders.items.find(item => item._id === ownProps.params.orderId),
  fontFamily: state.brand.values.fontFamily || null
})

export default connect(mapStateToProps)(OrderDetail)
