import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import TodoAdd from './TodoAdd'

describe('TodoAdd', () => {
  it('should exist', () => {
    expect(TodoAdd).toExist()
  })
  it('should call onTodoAdd prop with valid data', () => {
    const todo = { text: 'onTodoAdd should be called with valid data'}
    const spy = expect.createSpy()
    const todoAdd = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const node = ReactDOM.findDOMNode(todoAdd)
    const form = node.querySelector('form')
    todoAdd.refs.text.value = todo.text
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(todo)
  })
  it('should not call onTodoAdd prop when invalid input', () => {
    const spy = expect.createSpy()
    const todoAdd = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const node = ReactDOM.findDOMNode(todoAdd)
    const form = node.querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
