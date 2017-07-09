import React from 'react'
import { connect } from 'react-redux'

import OrderList from './OrderList'

const Orders = ({ isFetching, orders, fontFamily, color }) => {
  return (
    !isFetching &&
    <section>
      <h1 style={{ fontFamily, color }}>Orders</h1>
      <OrderList orders={orders} fontFamily={fontFamily} color={color} />
    </section>
  )
}

const mapStateToProps = ({ orders: { isFetching, items }, brand: { theme: { fontFamily, palette } }}) => ({
  isFetching,
  orders: items,
  fontFamily: fontFamily || null,
  color: palette && palette.textColor || null
})

export default connect(mapStateToProps)(Orders)
