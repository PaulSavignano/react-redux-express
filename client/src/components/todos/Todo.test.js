import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import Todo from './Todo'

import todos from './seed'

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist()
  })
  it('should call onToggle prop with uuid on click', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Todo {...todos[0]} onToggle={spy} />)
    const input = ReactDOM.findDOMNode(component).querySelector('input')
    TestUtils.Simulate.click(input)
    expect(spy).toHaveBeenCalledWith(todos[0].uuid)
  })
})
