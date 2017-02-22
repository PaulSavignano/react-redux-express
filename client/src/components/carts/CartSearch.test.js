import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import CartSearch from './CartSearch'

describe('CartSearch', () => {
  it('should exist', () => {
    expect(CartSearch).toExist()
  })
  it('should call onSearch with entered input text', () => {
    const searchText = 'Dog'
    const spy = expect.createSpy()
    const cartSearch = TestUtils.renderIntoDocument(<CartSearch onSearch={spy} />)
    cartSearch.refs.searchText.value = searchText
    TestUtils.Simulate.change(cartSearch.refs.searchText)
    expect(spy).toHaveBeenCalledWith('Dog')
  })
})
