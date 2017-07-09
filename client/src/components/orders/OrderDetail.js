import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'

import OrderCartList from './OrderCartList'
import formatPrice from '../../utils/formatPrice'

const OrderDetail = ({
  order: {
    _id,
    cart: { items, subTotal, tax, total },
    address: { name, phone, street, city, state, zip }
  }
}) => (
  <Paper className="section">
    <h1>Order {_id}</h1>
    <OrderCartList items={items} />
    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
      <div style={{ margin: 16 }}>
        <div>Address</div>
        <div>{name}</div>
        <div>{phone}</div>
        <div>{street}</div>
        <div>{city}, {state} {zip}</div>
      </div>
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
        <h2 style={{ margin: '16px 16px 4px 16px' }}>Subtotal {formatPrice(subTotal)}</h2>
        <h2 style={{ margin: '4px 16px' }}>Tax {(tax * 100).toFixed(2)}%</h2>
        <h2 style={{ margin: '4px 16px' }}>Total {formatPrice(total)}</h2>
      </div>
    </div>
  </Paper>
)


export default OrderDetail
