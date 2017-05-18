import React from 'react'
import { connect } from 'react-redux'

import formatPrice from '../../modules/formatPrice'
import OrderCartList from '../components/OrderCartList'

const OrderDetail = ({ isFetching, item }) => {
  return (
    isFetching ? null :
    <main>
      <section><h1>Order {item._id}</h1></section>
      <OrderCartList items={item.cart.items} />
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Total</h1>
          <h1>{formatPrice(item.cart.total)}</h1>
        </div>
      </section>
    </main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  item: state.orders.items.find(item => item._id === ownProps.params.orderId)
})

export default connect(mapStateToProps)(OrderDetail)
