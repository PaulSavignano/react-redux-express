import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import App from './App'

import carts from './carts/seed'
import products from './products/seed'
import todos from './todos/seed'

describe('App', () => {
  it('should exist', () => {
    expect(App).toExist()
  })


  // Cart
  it('should add cart to the carts state on handleCartAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      carts: [],
      products: [products[0]]
    })
    app.handleCartAdd(carts[0])
    expect(app.state.carts[0].productQty).toBe(carts[0].productQty)
  })
  it('should delete cart from the carts state on handleCartDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ carts: [carts[0]] })
    expect(app.state.carts[0].productId).toBe(carts[0].productId)
    app.handleCartDelete(null, carts[0].uuid)
    expect(app.state.carts[0]).toBe(undefined)
  })



  // Product
  it('should add product to the products state on handleProductAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      products: []
    })
    app.handleProductAdd(products[0])
    expect(app.state.products[0].name).toBe(products[0].name)
  })
  it('should delete product from the products state on handleProductDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ products: [products[0]] })
    expect(app.state.products[0].name).toBe(products[0].name)
    app.handleProductDelete(null, products[0].uuid)
    expect(app.state.products[0]).toBe(undefined)
  })



  // Todo
  it('should add todo to the todos state on handleTodoAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      todos: []
    })
    app.handleTodoAdd(todos[0])
    expect(app.state.todos[0].text).toBe(todos[0].text)
  })
  it('should delete todo from the todos state on handleTodoDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ todos: [todos[0]] })
    expect(app.state.todos[0].text).toBe(todos[0].text)
    app.handleTodoDelete(todos[0]._id, todos[0].uuid)
    expect(app.state.todos[0]).toBe(undefined)
  })
  it('should toggle completed todo value when handleTodoToggle called', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ todos: [todos[0]] })
    expect(app.state.todos[0].completed).toBe(true)
    app.handleTodoToggle(todos[0].uuid)
    expect(app.state.todos[0].completed).toBe(false)
  })
})
