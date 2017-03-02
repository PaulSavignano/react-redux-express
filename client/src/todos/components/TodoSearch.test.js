import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { TodoSearch } from './TodoSearch'

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist()
  })
  it('should dispatch SEARCH_TODOS on input change', () => {
    const searchTodosText = 'Dog'
    const action = {
      type: 'SET_TODO_SEARCH',
      searchTodosText
    }
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)
    component.refs.searchText.value = searchTodosText
    TestUtils.Simulate.change(component.refs.searchText)
    expect(spy).toHaveBeenCalledWith(action)
  })
  it('should dispatch toggleShowCompleted when checkbox checked', () => {
    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)
    component.refs.showCompleted.checked = true
    TestUtils.Simulate.change(component.refs.showCompleted)
    expect(spy).toHaveBeenCalledWith(action)
  })
})
