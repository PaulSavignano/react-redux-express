import React from 'react'
import { connect } from 'react-redux'

import OrderList from '../components/OrderList'

const Orders = ({ isFetching, items }) => {
  return (
    isFetching ? null :
    <main>
      <section><h1>Orders</h1></section>
      <OrderList items={items} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  items: state.orders.items
})

export default connect(mapStateToProps)(Orders)
