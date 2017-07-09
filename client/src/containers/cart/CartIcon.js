import React from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

const CartIcon = ({ quantity, color }) => (
  quantity ?
  <Badge
    style={{ padding: '0 16px 0 0' }}
    badgeContent={quantity}
    primary={true}
    badgeStyle={{top: -10, left: 10 }}
  >
    <FontIcon
      className="fa fa-shopping-cart"
      style={{ color }}
    />
  </Badge>
  :
  <FontIcon
    className="fa fa-shopping-cart"
    style={{ color }}
  />
)

const mapStateToProps = ({ carts: { cart: { quantity } }}) => ({
  quantity
})

export default connect(mapStateToProps)(CartIcon)
