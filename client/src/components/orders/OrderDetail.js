import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText } from 'material-ui/Card'

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
  dispatch,
  order: {
    _id,
    cart: { items, subTotal, tax, total },
    createdAt,
    address: { name, phone, street, city, state, zip }
  }
}) => (
  <Card zDepth={0}>
    <CardText>
      <h1>Order Detail</h1>
      <div style={styles.orderDetail}>
        <div>{`Ordered On ${moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}`}</div>
        <div>{`Order #${_id}`}</div>
      </div>
    </CardText>

    <CardText style={styles.orderDetail}>
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
            <div style={{ marginRight: 16 }}>Subtotal:</div>
            <div>{formatPrice(subTotal)}</div>
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
    </CardText>
    <div>
      <OrderCartList
        dispatch={dispatch}
        items={items}
      />
    </div>
  </Card>
)

OrderDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default OrderDetail
