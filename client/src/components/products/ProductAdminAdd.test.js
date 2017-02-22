import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdminAdd from './ProductAdd'

describe('ProductAdminAdd', () => {
  it('should exist', () => {
    expect(ProductAdminAdd).toExist()
  })
  it('should call onProductAdd prop with valid data', () => {
    const product = {
      name: 'test',
      description: 'testing',
      price: 9000
    }
    const spy = expect.createSpy()
    const productAdminAdd = TestUtils.renderIntoDocument(<ProductAdminAdd onProductAdd={spy} />)
    const node = ReactDOM.findDOMNode(productAdminAdd)
    const form = node.querySelector('form')
    productAdminAdd.refs.name.value = product.name
    productAdminAdd.refs.description.value = product.description
    productAdminAdd.refs.price.value = product.price
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(product)
  })
  it('should not call onProductAdd prop when invalid input', () => {
    const spy = expect.createSpy()
    const productAdminAdd = TestUtils.renderIntoDocument(<ProductAdminAdd onProductAdd={spy} />)
    const node = ReactDOM.findDOMNode(productAdminAdd)
    const form = node.querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
