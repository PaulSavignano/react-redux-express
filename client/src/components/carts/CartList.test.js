import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import CartList from './CartList'
import Cart from './Cart'
import carts from './seed'

describe('CartList', () => {
  it('should exist', () => {
    expect(CartList).toExist()
  })
  it('should render one CartList component for each cart item', () => {
    const component = TestUtils.renderIntoDocument(<CartList carts={carts} />)
    const components = TestUtils.scryRenderedComponentsWithType(component, Cart)
    expect(components.length).toBe(carts.length)
  })
})
