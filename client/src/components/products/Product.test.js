import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import Product from './Product'


const product = { _id: 'A1B2C3', uuid: uuidV1(), productId: 'ABC123', productQty: 6 }

describe('Product', () => {
  it('should exist', () => {
    expect(Product).toExist()
  })
  it('should add a product to the cart', () => {
    const spy = expect.createSpy()
    const productComponent = TestUtils.renderIntoDocument(<Product {...product} onCartAdd={spy} />)
    const node = ReactDOM.findDOMNode(productComponent)
    const button = node.querySelector('#addToCart')
    productComponent.refs.qty.value = product.productQty
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith({ productId: product._id, productQty: product.productQty})
  })
  it('should Delete a product from the cart', () => {
    const spy = expect.createSpy()
    const productComponent = TestUtils.renderIntoDocument(<Product {...product} onProductDelete={spy} />)
    const button = ReactDOM.findDOMNode(productComponent).querySelector('#deleteCart')
    TestUtils.Simulate.click(button)
    expect(spy).toHaveBeenCalledWith(product._id, product.uuid)
  })
})
