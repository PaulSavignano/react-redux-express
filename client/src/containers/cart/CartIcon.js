import React from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

const CartIcon = ({ cart, color, isFetching }) => (
  !isFetching &&  cart.quantity ?
  <Badge
    style={{ padding: '0 16px 0 0' }}
    badgeContent={cart.quantity}
    primary={true}
    badgeStyle={{top: -10, left: 10 }}
  >
    <FontIcon
      className="fa fa-shopping-cart"
      style={{ color }}
    />
  </Badge>
  : !isFetching &&
  <FontIcon
    className="fa fa-shopping-cart"
    style={{ color }}
  />
)

const mapStateToProps = ({ carts: { cart, isFetching } }) => ({
  cart,
  isFetching
})

export default connect(mapStateToProps)(CartIcon)
