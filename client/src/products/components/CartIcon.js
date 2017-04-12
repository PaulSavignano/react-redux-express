import React from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

const CartIcon = ({ qty }) => (
  qty ?
  <Badge
    badgeContent={qty}
    primary={true}
    badgeStyle={{top: 10, right: 12}}
  >
    <FontIcon
      style={{ color: '#757575' }}
      className="fa fa-shopping-cart"
    />
  </Badge>
  :
  <FontIcon
    style={{ color: '#757575' }}
    className="fa fa-shopping-cart"
  />
)

const mapStateToProps = (state) => ({
  qty: state.cart.quantity
})

export default connect(mapStateToProps)(CartIcon)
