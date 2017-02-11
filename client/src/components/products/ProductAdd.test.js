import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdd from './ProductAdd'

describe('ProductAdd', () => {
  it('should exist', () => {
    expect(ProductAdd).toExist()
  })
  it('should call onProductAdd prop with valid data', () => {
    const productName = 'Node Development'
    const spy = expect.createSpy()
    const productAdd = TestUtils.renderIntoDocument(<ProductAdd onProductAdd={spy} />)
    const node = ReactDOM.findDOMNode(productAdd)
    const form = node.querySelector('form')
    productAdd.refs.productName.value = productName
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(productName)
  })
  it('should not call onProductAdd prop when invalid input', () => {
    const productName = ''
    const spy = expect.createSpy()
    const productAdd = TestUtils.renderIntoDocument(<ProductAdd onProductAdd={spy} />)
    const node = ReactDOM.findDOMNode(productAdd)
    const form = node.querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
