import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { Todo } from './Todo'
import { startUpdateTodo, startDeleteTodo } from '../actions/index'

import todoSeeds from '../seed'

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist()
  })
  it('should dispatch TOGGLE_TODO action on click', () => {
    const action = startUpdateTodo(todoSeeds[0]._id, !todoSeeds[0].completed)
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<Todo {...todoSeeds[0]} dispatch={spy} />)
    const input = ReactDOM.findDOMNode(component).querySelector('input')
    TestUtils.Simulate.click(input)
    expect(spy).toHaveBeenCalledWith(action)
  })
})
