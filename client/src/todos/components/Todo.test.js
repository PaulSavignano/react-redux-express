import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { Todo } from './Todo'

import todos from '../seed'

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist()
  })
  it('should dispatch TODO_TOGGLE action on click', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Todo {...todos[0]} dispatch={spy} />)
    const input = ReactDOM.findDOMNode(component).querySelector('input')
    TestUtils.Simulate.click(input)
    expect(spy).toHaveBeenCalledWith({
      type: 'TODO_TOGGLE',
      uuid: todos[0].uuid
    })
  })
})
