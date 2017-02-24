import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdminAdd from './ProductAdminAdd'

import products from '../seed'

describe('ProductAdminAdd', () => {
  it('should exist', () => {
    expect(ProductAdminAdd).toExist()
  })
  it('should call onProductAdd prop with valid data', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<ProductAdminAdd onProductAdd={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    component.refs.name.value = products[0].name
    component.refs.description.value = products[0].description
    component.refs.price.value = products[0].price
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith({
      name: products[0].name,
      description: products[0].description,
      price: products[0].price
    })
  })
  it('should not call onProductAdd prop when invalid input', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<ProductAdminAdd onProductAdd={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
