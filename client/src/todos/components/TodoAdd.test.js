import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { TodoAdd } from './TodoAdd'
import todos from '../seed'

describe('TodoAdd', () => {
  it('should exist', () => {
    expect(TodoAdd).toExist()
  })
  it('should dispatch TODO_ADD when valid data', () => {
    const action = {
      type: 'TODO_ADD',
      text: todos[0].text
    }
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    component.refs.text.value = todos[0].text
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(action)
  })
  it('should not dispatch todoAdd when invalid input', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
