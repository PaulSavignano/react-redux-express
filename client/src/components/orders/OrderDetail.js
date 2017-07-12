import React from 'react'
import Paper from 'material-ui/Paper'

import moment from 'moment'
import formatPrice from '../../utils/formatPrice'
import OrderCartList from './OrderCartList'

const styles = {
  orderDetail: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
  },
  orderSummary: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },
  details: {
    margin: '8px 0'
  }
}

const OrderDetail = ({
  order: {
    _id,
    cart: { items, subTotal, tax, total },
    createdAt,
    address: { name, phone, street, city, state, zip }
  }
}) => (
  <Paper className="section">
    <div style={{ margin: 16 }}>
      <h1>Order Detail</h1>
      <div style={styles.orderDetail}>
        <div>{`Ordered On ${moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}`}</div>
        <div>{`Order #${_id}`}</div>
      </div>
    </div>

    <div style={{...styles.orderDetail, margin: 16 }}>
      <div>
        <strong>Address</strong>
        <div style={styles.details}>
          <div>{name}</div>
          <div>{phone}</div>
          <div>{street}</div>
          <div>{city}, {state} {zip}</div>
        </div>
      </div>
      <div>
        <strong>Order Summary</strong>
        <div style={styles.details}>
          <div style={styles.orderSummary}>
            <div>Subtotal:</div>
            <div>{subTotal}</div>
          </div>
          <div style={styles.orderSummary}>
            <div>Tax:</div>
            <div>{(tax * 100).toFixed(2)}</div>
          </div>
          <div style={{...styles.orderSummary, ...styles.details}}>
            <strong>Total:</strong>
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>

      </div>
    </div>
    <OrderCartList items={items} />
  </Paper>
)


export default OrderDetail
