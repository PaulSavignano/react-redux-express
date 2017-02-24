import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import Product from './Product'

import products from '../seed'

describe('Product', () => {
  it('should exist', () => {
    expect(Product).toExist()
  })
  it('should add a product to the cart', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Product {...products[0]} onCartAdd={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    component.refs.qty.value = 3
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith({ productId: products[0]._id, productQty: 3})
  })
})
