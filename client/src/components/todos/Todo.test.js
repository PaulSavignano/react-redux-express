import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import Todo from './Todo'

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist()
  })
  it('should call onToggle prop with uuid on click', () => {
    const todo = { uuid: uuidV1(), text: 'Test Todo component onToggle', completed: false }
    const spy = expect.createSpy()
    const todoComponent = TestUtils.renderIntoDocument(<Todo {...todo} onToggle={spy} />)
    const input = ReactDOM.findDOMNode(todoComponent).querySelector('input')
    TestUtils.Simulate.click(input)
    expect(spy).toHaveBeenCalledWith(todo.uuid)
  })
})
