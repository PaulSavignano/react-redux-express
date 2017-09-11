import React from 'react'
import PropTypes from 'prop-types'

import OrderCartItem from './OrderCartItem'

const OrderCartList = ({ dispatch, items }) => (
  <div className="OrderCartList">
    {items.map(item => (
      <OrderCartItem
        dispatch={dispatch}
        key={item._id}
        item={item}
      />
    ))}
  </div>
)

OrderCartList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}

export default OrderCartList
