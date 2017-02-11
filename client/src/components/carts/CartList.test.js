import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import CartList from './CartList'
import Cart from './Cart'

const carts = [
  { _id: 1, productId: 'A1B2C3', productQty: 1 },
  { _id: 2, productId: 'D4E5F6', productQty: 2 },
  { _id: 3, productId: 'G7H8I9', productQty: 3 }
]

describe('CartList', () => {
  it('should exist', () => {
    expect(CartList).toExist()
  })
  it('should render one CartList component for each cart item', () => {
    const cartList = TestUtils.renderIntoDocument(<CartList carts={carts} />)
    const cartsComponents = TestUtils.scryRenderedComponentsWithType(cartList, Cart)
    expect(cartsComponents.length).toBe(carts.length)
  })
})
