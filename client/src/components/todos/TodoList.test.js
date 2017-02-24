import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import TodoList from './TodoList'
import Todo from './Todo'
import todos from './seed'

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist()
  })
  it('should render one Todo component for each todo item', () => {
    const component = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
    const components = TestUtils.scryRenderedComponentsWithType(component, Todo)
    expect(components.length).toBe(todos.length)
  })
})
