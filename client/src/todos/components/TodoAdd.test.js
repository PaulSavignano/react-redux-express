import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { startAddTodo } from '../actions/index'

import { TodoAdd } from './TodoAdd'
import todoSeeds from '../seed'

describe('TodoAdd', () => {
  it('should exist', () => {
    expect(TodoAdd).toExist()
  })
  it('should dispatch ADD_TODO when valid data', () => {
    const action = startAddTodo(todoSeeds[0].text)
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    form.querySelector('#text').value = todoSeeds[0].text
    TestUtils.Simulate.submit(form)
    expect(spy).toHaveBeenCalledWith(action)
  })
  it('should not dispatch postTodo when invalid input', () => {
    const spy = expect.createSpy()
    const component = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy} />)
    const form = ReactDOM.findDOMNode(component).querySelector('form')
    const textInput = form.querySelector('#text')
    textInput.value = ''
    TestUtils.Simulate.submit(form)
    expect(spy).toNotHaveBeenCalled()
  })
})
