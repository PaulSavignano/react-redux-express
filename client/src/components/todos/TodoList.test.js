import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import ConnectedTodoList, { TodoList } from './TodoList'
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
  it('should render empty message if no todos', () => {
    const noTodos = []
    const component = TestUtils.renderIntoDocument(<TodoList todos={noTodos} />)
    const el = ReactDOM.findDOMNode(component).querySelector('.container__message')
    expect(el).toExist()
  })
})
