import React from 'react'
import PropTypes from 'prop-types'
import { CardTitle } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'

const CartTotal = ({ dispatch, cart, user }) => (
  cart.total &&
  <div style={{ margin: 8 }}>
    <div style={{ margin: 8 }}>
      <CardTitle title={`Subtotal ${formatPrice(cart.subTotal)}`} style={{ textAlign: 'right', padding: '8px 8px' }}/>
      <CardTitle title={`Taxes ${cart.tax * 100}%`} style={{ textAlign: 'right', padding: '0 8px' }}/>
      <CardTitle title={`Total ${formatPrice(cart.total)}`} style={{ textAlign: 'right', padding: '8px 8px' }}/>
    </div>
  </div>
)

CartTotal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default CartTotal
