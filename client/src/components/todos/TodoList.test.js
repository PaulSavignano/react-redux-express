import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import expect from 'expect'
import TodoList from './TodoList'
import Todo from './Todo'

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist()
  })
  it('should render one Todo component for each todo item', () => {
    const todos = [
      { text: 'Play with Westie', completed: true, completedAt: 1 },
      { text: 'Walk Pepper', completed: false, completedAt: null },
      { text: 'Eat dinner', completed: false, completedAt: null },
    ]
    const todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
    const todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo)
    expect(todosComponents.length).toBe(todos.length)
  })
})
