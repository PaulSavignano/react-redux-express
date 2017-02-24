import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import TodoAdd from './TodoAdd'
import todos from './seed'

describe('TodoAdd', () => {
  it('should exist', () => {
    expect(TodoAdd).toExist()
  })
  it('should call onTodoAdd prop with valid data', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    component.refs.text.value = todos[0].text
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith({ text: todos[0].text })
  })
  it('should not call onTodoAdd prop when invalid input', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd onTodoAdd={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
