import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import expect from 'expect'
import Cart from './Cart'
import CartProduct from './CartProduct'

describe('Cart', () => {
  it('should exist', () => {
    expect(Cart).toExist()
  })
  it('should render one CartProduct component for each cart item', () => {
    const cartProducts = [
      { _id: 1, productId: '1H3J4Klhyyu8UUUG', quantity: 3 },
      { _id: 2, productId: '1H3J4KlhJHuAAMNH', quantity: 2 },
      { _id: 3, productId: 'HNIBH389JUHU82L8', quantity: 1 }
    ]
    const cart = TestUtils.renderIntoDocument(<Cart cartProducts={cartProducts} />)
    const cartComponents = TestUtils.scryRenderedComponentsWithType(cart, CartProduct)
    expect(cartComponents.length).toBe(cartProducts.length)
  })
})
