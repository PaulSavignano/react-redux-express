import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import Cart from './Cart'

const cart = { _id: 'A1B2C3', uuid: uuidV1(), productId: 'A1B2C3', productQty: 6 }


describe('Cart', () => {
  it('should exist', () => {
    expect(Cart).toExist()
  })
  it('should update cart product quantity', () => {
    const spy = expect.createSpy()
    const cartComponent = TestUtils.renderIntoDocument(<Cart {...cart} onCartUpdate={spy} />)
    const button = ReactDOM.findDOMNode(cartComponent).querySelector('#update')
    cartComponent.refs.qty.value = cart.productQty
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith(cart.uuid, cart.productQty)
  })
  it('should delete cart product', () => {
    const spy = expect.createSpy()
    const cartComponent = TestUtils.renderIntoDocument(<Cart {...cart} onCartDelete={spy} />)
    const node = ReactDOM.findDOMNode(cartComponent)
    const button = node.querySelector('#delete')
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith(cart._id, cart.uuid)
  })
})
