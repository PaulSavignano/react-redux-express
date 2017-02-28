import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { TodoSearch } from './TodoSearch'

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist()
  })
  it('should dispatch SET_TODO_SEARCH on input change', () => {
    const searchText = 'Dog'
    const action = {
      type: 'SET_TODO_SEARCH',
      todoSearch
    }
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />)
    component.refs.todoSearch.value = todoSearch
    TestUtils.Simulate.change(component.refs.todoSearch)
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
