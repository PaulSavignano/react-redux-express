import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { redirectUser } from '../../users/actions/index'
import formatPrice from '../../modules/formatPrice'

const CartTotal = ({ dispatch, cart, user }) => (
  !cart.total ? null :
  <div style={{ margin: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div style={{ textAlign: 'right' }}>
        <h2>Subtotal {formatPrice(cart.subTotal)}</h2>
        <h2>Taxes {cart.tax *100}%</h2>
        <h2>Total {formatPrice(cart.total)}</h2>
      </div>

    </div>
    <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-end' }}>
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
