import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdminSearch from './ProductAdminSearch'

describe('ProductAdminSearch', () => {
  it('should exist', () => {
    expect(ProductAdminSearch).toExist()
  })
  it('should call onSearch with entered input text', () => {
    const searchText = 'Pepper'
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<ProductAdminSearch onSearch={spy} />)
    component.refs.searchText.value = searchText
    TestUtils.Simulate.change(component.refs.searchText)
    expect(spy).toHaveBeenCalledWith('Pepper')
  })
})
