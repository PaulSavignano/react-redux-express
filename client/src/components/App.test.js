import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import App from './App'

describe('App', () => {
  it('should exist', () => {
    expect(App).toExist()
  })
  it('should add todo to the todos state on handleCartAdd', () => {
    const cart = { uuid: uuidV1(), productId: 'A1B2C3', productQty: 3 }
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      carts: [],
    })
    app.handleCartAdd(cart)
    expect(app.state.carts[0].productQty).toBe(cart.productQty)
  })
  it('should add todo to the todos state on handleProductAdd', () => {
    const product = { uuid: uuidV1(), name: 'App Product add test', description: 'Adding a product', price: 3000 }
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      products: []
    })
    app.handleProductAdd(product)
    expect(app.state.products[0].name).toBe(product.name)
  })
  it('should add todo to the todos state on handleTodoAdd', () => {
    const todo = { uuid: uuidV1(), text: 'Test add todo' }
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      todos: []
    })
    app.handleTodoAdd(todo)
    expect(app.state.todos[0].text).toBe(todo.text)
  })
})
