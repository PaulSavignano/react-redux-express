import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { formatPrice } from '../../modules/formatPrice'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  checkout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-end',
    width: '100%'
  },
  p: {
    textAlign: 'right'
  }
}

const CartTotal = ({ total }) => (
  <div className="mdl-grid mdl-cell mdl-cell--12-col">
    <div style={styles.container}>
      <span>subtotal</span>
      <h3>{formatPrice(total)}</h3>
    </div>
    <div style={styles.checkout}>
      <p style={styles.p}>Shipping, taxes, and discounts calculated at checkout</p>
      <RaisedButton label="Checkout" primary={true} onTouchTap={() => browserHistory.push('/checkout')}/>
    </div>
  </div>
)

const mapStateToProps = state => ({
  total: state.cart.total
})

export default connect(mapStateToProps)(CartTotal)
