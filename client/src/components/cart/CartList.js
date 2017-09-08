import React from 'react'
import PropTypes from 'prop-types'

import CartItem from './CartItem'

const CartList = ({ cart, dispatch }) => (
  <div>
    {cart.items.map(item => (
      <CartItem
        dispatch={dispatch}
        key={item.productId}
        item={item}
      />
    ))}
  </div>
)

CartList.propTypes = {
  cart: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default CartList
