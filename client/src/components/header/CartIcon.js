import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

class CartIcon extends Component {
  handleNavToCart = () => {
    this.props.onNavToCart()
  }
  render() {
    const {
      cartQty,
      color
    } = this.props
    return (
      <IconButton
        children={
          <Badge
            badgeContent={cartQty}
            primary={true}
            badgeStyle={{top: -9, left: 9 }}
          >
            <FontIcon
              className="fa fa-shopping-cart"
              style={{ color }}
            />
          </Badge>
        }
        onTouchTap={this.handleNavToCart}
        iconStyle={{ padding: 0 }}
        style={{ margin: '0 0 0 6px'}}
      />
    )
  }
}

CartIcon.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default CartIcon
