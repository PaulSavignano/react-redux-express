import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import Cart from './Cart'
import carts from './seed'

describe('Cart', () => {
  it('should exist', () => {
    expect(Cart).toExist()
  })
  it('should update cart product quantity', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Cart {...carts[0]} onCartUpdate={spy} />)
    component.setState({ productQty: carts[0].productQty })
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(carts[0]._id, component.state.productQty)
  })
  it('should delete cart product', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Cart {...carts[0]} onCartDelete={spy} />)
    const button = ReactDOM.findDOMNode(component).querySelector('#delete')
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith(carts[0]._id)
  })
})
