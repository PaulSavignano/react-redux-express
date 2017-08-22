import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

import { toggleDrawer } from '../../actions/drawer'

class HeaderCartIcon extends Component {
  handleNavToCart = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    this.props.dispatch(push('/user/cart'))
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
            style={{ padding: '0 16px 0 0' }}
            badgeContent={cartQty}
            primary={true}
            badgeStyle={{top: -10, left: 10 }}
          >
            <FontIcon
              className="fa fa-shopping-cart"
              style={{ color }}
            />
          </Badge>
        }
        onTouchTap={this.handleNavToCart}
        style={{ padding: '12px 0' }}
      />
    )
  }
}

HeaderCartIcon.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default HeaderCartIcon
