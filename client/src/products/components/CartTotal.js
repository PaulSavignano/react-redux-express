import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { formatPrice } from '../../modules/formatPrice'

const CartTotal = ({ total }) => (
  !total ? null :
  <div  style={{ margin: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <span>subtotal</span>
      <h3>{formatPrice(total)}</h3>
    </div>
    <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-end' }}>
      <p style={{ textAlign: 'right' }}>Shipping, taxes, and discounts calculated at checkout</p>
      <RaisedButton label="Checkout" primary={true} onTouchTap={() => browserHistory.push('/checkout')}/>
    </div>
  </div>
)

const mapStateToProps = state => ({
  total: state.cart.total
})

export default connect(mapStateToProps)(CartTotal)
