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
    const product = {
      name: 'test',
      description: 'testing',
      price: 9000
    }
    const spy = expect.createSpy()
    const productAdd = TestUtils.renderIntoDocument(<ProductAdd onProductAdd={spy} />)
    const node = ReactDOM.findDOMNode(productAdd)
    const form = node.querySelector('form')
    productAdd.refs.name.value = product.name
    productAdd.refs.description.value = product.description
    productAdd.refs.price.value = product.price
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(product)
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
