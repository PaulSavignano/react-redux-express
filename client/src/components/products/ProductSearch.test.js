import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductSearch from './ProductSearch'

describe('ProductSearch', () => {
  it('should exist', () => {
    expect(ProductSearch).toExist()
  })
  it('should call onSearch with entered input text', () => {
    const searchText = 'Dog'
    const spy = expect.createSpy()
    const productSearch = TestUtils.renderIntoDocument(<ProductSearch onSearch={spy} />)
    productSearch.refs.searchText.value = searchText
    TestUtils.Simulate.change(productSearch.refs.searchText)
    expect(spy).toHaveBeenCalledWith('Dog')
  })
})
