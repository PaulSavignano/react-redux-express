import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import CartList from './CartList'
import Cart from './Cart'

const carts = [
  { uuid: uuidV1(), productId: 'A1B2C3', productQty: 1 },
  { uuid: uuidV1(), productId: 'D4E5F6', productQty: 2 },
  { uuid: uuidV1(), productId: 'G7H8I9', productQty: 3 }
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
