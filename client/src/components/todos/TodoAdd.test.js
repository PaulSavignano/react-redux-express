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
    const todoText = 'Check mail'
    const spy = expect.createSpy()
    const todoAdd = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const node = ReactDOM.findDOMNode(todoAdd)
    const form = node.querySelector('form')
    todoAdd.refs.todoText.value = todoText
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith('Check mail')
  })
  it('should not call onTodoAdd prop when invalid input', () => {
    const todoText = ''
    const spy = expect.createSpy()
    const todoAdd = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const node = ReactDOM.findDOMNode(todoAdd)
    const form = node.querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
