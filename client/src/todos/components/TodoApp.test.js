import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import TodoApp from './TodoApp'

describe('TodosPage', () => {
  it('should exist', () => {
    expect(TodoApp).toExist()
  })
})
