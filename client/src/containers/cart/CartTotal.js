import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { CardActions, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import formatPrice from '../../utils/formatPrice'
import { redirectUser } from '../../actions/users'

const CartTotal = ({ dispatch, cart, user }) => (
  cart.total &&
  <div style={{ margin: 8 }}>
    <div style={{ margin: 8 }}>
      <CardTitle title={`Subtotal ${formatPrice(cart.subTotal)}`} style={{ textAlign: 'right', padding: '8px 8px' }}/>
      <CardTitle title={`Taxes ${cart.tax * 100}`} style={{ textAlign: 'right', padding: '0 8px' }}/>
      <CardTitle title={`Total ${formatPrice(cart.total)}`} style={{ textAlign: 'right', padding: '8px 8px' }}/>
    </div>
    <CardActions>
      <RaisedButton
        label="Checkout"
        primary={true}
        fullWidth={true}
        onTouchTap={() => {
          !user.values.email && dispatch(redirectUser('/user/order'))
          dispatch(push('/user/order'))
        }}
      />
    </CardActions>
  </div>
)

export default connect()(CartTotal)
