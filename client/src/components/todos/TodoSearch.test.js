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
    const component = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
    component.refs.searchText.value = searchText
    TestUtils.Simulate.change(component.refs.searchText)
    expect(spy).toHaveBeenCalledWith(false, 'Dog')
  })
  it('should call onSearch with proper checked value', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />)
    component.refs.showCompleted.checked = true
    TestUtils.Simulate.change(component.refs.showCompleted)
    expect(spy).toHaveBeenCalledWith(true, '')
  })
})
