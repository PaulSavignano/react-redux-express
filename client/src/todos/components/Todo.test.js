import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { Todo } from './Todo'

import todoSeeds from '../seed'

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist()
  })
  it('should dispatch TOGGLE_TODO action on click', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Todo {...todoSeeds[0]} dispatch={spy} />)
    const input = ReactDOM.findDOMNode(component).querySelector('input')
    TestUtils.Simulate.click(input)
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_TODO',
      _id: todoSeeds[0]._id
    })
  })
})
