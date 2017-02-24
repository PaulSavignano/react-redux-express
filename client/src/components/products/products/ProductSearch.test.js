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
    const searchText = 'Weston'
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<ProductSearch onSearch={spy} />)
    component.refs.searchText.value = searchText
    TestUtils.Simulate.change(component.refs.searchText)
    expect(spy).toHaveBeenCalledWith('Weston')
  })
})
