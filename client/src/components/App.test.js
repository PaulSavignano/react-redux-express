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


  // Cart
  const cart = { uuid: uuidV1(), productId: 'A1B2C3', productQty: 3 }
  it('should add cart to the todos state on handleCartAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      carts: [],
    })
    app.handleCartAdd(cart)
    expect(app.state.carts[0].productQty).toBe(cart.productQty)
  })
  it('should delete cart from the carts state on handleCartDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ carts: [cart] })
    expect(app.state.carts[0].productId).toBe(cart.productId)
    app.handleCartDelete(null, cart.uuid)
    expect(app.state.carts[0]).toBe(undefined)
  })



  // Product
  const product = { uuid: uuidV1(), name: 'App Product add test', description: 'Adding a product', price: 3000 }
  it('should add product to the products state on handleProductAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      products: []
    })
    app.handleProductAdd(product)
    expect(app.state.products[0].name).toBe(product.name)
  })
  it('should delete product from the products state on handleProductDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ products: [product] })
    expect(app.state.products[0].name).toBe(product.name)
    app.handleProductDelete(null, product.uuid)
    expect(app.state.products[0]).toBe(undefined)
  })



  // Todo
  const todo = { uuid: uuidV1(), text: 'Test Toggle', completed: false }
  it('should add todo to the todos state on handleTodoAdd', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({
      todos: []
    })
    app.handleTodoAdd(todo)
    expect(app.state.todos[0].text).toBe(todo.text)
  })
  it('should delete todo from the todos state on handleTodoDelete', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ todos: [todo] })
    expect(app.state.todos[0].text).toBe(todo.text)
    app.handleTodoDelete(todo._id, todo.uuid)
    expect(app.state.todos[0]).toBe(undefined)
  })
  it('should toggle completed todo value when handleTodoToggle called', () => {
    const app = TestUtils.renderIntoDocument(<App />)
    app.setState({ todos: [todo] })
    expect(app.state.todos[0].completed).toBe(false)
    app.handleTodoToggle(todo.uuid)
    expect(app.state.todos[0].completed).toBe(true)
  })
})
