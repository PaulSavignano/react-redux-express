import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import configureStore from '../../store/configureStore'

import ConnectedTodoList, { TodoList } from './TodoList'
import ConnectedTodo, { Todo } from './Todo'
import todoSeeds from '../seed'

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist()
  })
  it('should render one Todo component for each todo item', () => {
    const store = configureStore({ todos: todoSeeds })
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    )
    const component = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0]
    const components = TestUtils.scryRenderedComponentsWithType(component, ConnectedTodo)
    expect(components.length).toBe(todoSeeds.length)
  })
  it('should render empty message if no todos', () => {
    const noTodos = []
    const component = TestUtils.renderIntoDocument(<TodoList todos={noTodos} />)
    const el = ReactDOM.findDOMNode(component).querySelector('.container__message')
    expect(el).toExist()
  })
})
