import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdmin from './ProductAdmin'

import products from '../seed'

describe('ProductAdmin', () => {
  it('should exist', () => {
    expect(ProductAdmin).toExist()
  })
  it('should update a product', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<ProductAdmin {...products[0]} onProductUpdate={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    component.refs.name.value = products[0].name
    component.refs.description.value = products[0].description
    component.refs.price.value = products[0].price
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith({
      _id: products[0]._id,
      name: products[0].name,
      description: products[0].description,
      price: products[0].price
    })
  })
  it('should Delete a product', () => {
    const spy = expect.createSpy()
    const productComponent = TestUtils.renderIntoDocument(<ProductAdmin {...products[0]} onProductDelete={spy} />)
    const button = ReactDOM.findDOMNode(productComponent).querySelector('#delete')
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith(products[0]._id)
  })
})
