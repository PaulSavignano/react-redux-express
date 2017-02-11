import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import CartAdd from './CartAdd'

describe('CartAdd', () => {
  it('should exist', () => {
    expect(CartAdd).toExist()
  })
  it('should call onCartAdd prop with valid data', () => {
    const cartProductId = 'A1B2C3'
    const spy = expect.createSpy()
    const cartAdd = TestUtils.renderIntoDocument(<CartAdd onCartAdd={spy} />)
    const node = ReactDOM.findDOMNode(cartAdd)
    const form = node.querySelector('form')
    cartAdd.refs.cartProductId.value = cartProductId
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(cartProductId)
  })
  it('should not call onCartAdd prop when invalid input', () => {
    const cartProductId = ''
    const spy = expect.createSpy()
    const cartAdd = TestUtils.renderIntoDocument(<CartAdd onCartAdd={spy} />)
    const node = ReactDOM.findDOMNode(cartAdd)
    const form = node.querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
