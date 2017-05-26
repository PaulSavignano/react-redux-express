import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { redirectUser } from '../../users/actions/index'
import formatPrice from '../../modules/formatPrice'

const CartTotal = ({ dispatch, total, user }) => (
  !total ? null :
  <div style={{ margin: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <span>subtotal</span>
      <h3>{formatPrice(total)}</h3>
    </div>
    <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-end' }}>
      <p style={{ textAlign: 'right' }}>Shipping, taxes, and discounts calculated at checkout</p>
      <RaisedButton
        label="Checkout"
        primary={true}
        onTouchTap={() => {
          !user.values.email && dispatch(redirectUser('/user/order'))
          dispatch(push('/user/order'))
        }}
      />
    </div>
  </div>
)

export default connect()(CartTotal)
