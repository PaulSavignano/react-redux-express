import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import TodoList from './TodoList'
import Todo from './Todo'

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist()
  })
  it('should render one Todo component for each todo item', () => {
    const todos = [
      { uuid: uuidV1(), text: 'Play with Westie', completed: true, completedAt: 1 },
      { uuid: uuidV1(), text: 'Walk Pepper', completed: false, completedAt: null },
      { uuid: uuidV1(), text: 'Eat dinner', completed: false, completedAt: null },
    ]
    const todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
    const todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo)
    expect(todosComponents.length).toBe(todos.length)
  })
})
