import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import TodoSearch from './TodoSearch'

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist()
  })
  it('should call onSearch with entered input text', () => {
    const searchText = 'Dog'
    const spy = expect.createSpy()
    const todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
    todoSearch.refs.searchText.value = searchText
    TestUtils.Simulate.change(todoSearch.refs.searchText)
    expect(spy).toHaveBeenCalledWith(false, 'Dog')
  })
  it('should call onSearch with proper checked value', () => {
    const spy = expect.createSpy()
    const todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
    todoSearch.refs.showCompleted.checked = true
    TestUtils.Simulate.change(todoSearch.refs.showCompleted)
    expect(spy).toHaveBeenCalledWith(true, '')
  })
})
