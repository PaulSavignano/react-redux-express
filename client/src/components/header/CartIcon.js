import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

class CartIcon extends Component {
  render() {
    const {
      badgeStyle,
      cartQty,
      color,
      style
    } = this.props
    return (
      <IconButton
        children={
          <Badge
            badgeContent={cartQty}
            primary={true}
            badgeStyle={badgeStyle}
          >
            <FontIcon
              className="fa fa-shopping-cart"
              style={{ color }}
            />
          </Badge>
        }
        containerElement={<Link to="/user/cart"/>}
        iconStyle={{ padding: 0 }}
        style={style}
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
