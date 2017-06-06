import React from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

const CartIcon = ({ qty }) => (
  qty ?
  <Badge
    style={{ padding: '0 16px 0 0' }}
    badgeContent={qty}
    primary={true}
    badgeStyle={{top: -10, left: 10 }}
  >
    <FontIcon
      className="fa fa-shopping-cart"
    />
  </Badge>
  :
  <FontIcon
    className="fa fa-shopping-cart"
  />
)

const mapStateToProps = ({ cart }) => ({
  qty: cart.cart.quantity
})

export default connect(mapStateToProps)(CartIcon)
