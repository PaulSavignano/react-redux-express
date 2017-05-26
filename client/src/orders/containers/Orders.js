import React from 'react'
import { connect } from 'react-redux'

import OrderList from '../components/OrderList'

const Orders = ({ isFetching, items }) => {
  return (
    isFetching ? null :
    <section>
      <h1>Orders</h1>
      <OrderList items={items} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.orders.isFetching,
  items: state.orders.items
})

export default connect(mapStateToProps)(Orders)
