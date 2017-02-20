import React, { Component } from 'react'
import uuidV1 from 'uuid/v1'

import {
  addCart,
  getCarts,
  deleteCart,

  addProduct,
  getProducts,
  deleteProduct,

  addTodo,
  getTodos,
  updateTodo,
  deleteTodo
  } from '../api/AppAPI'

import './App.css';
import CartList from './carts/CartList'
import CartAdd from './carts/CartAdd'
import CartSearch from './carts/CartSearch'

import ProductList from './products/ProductList'
import ProductAdd from './products/ProductAdd'
import ProductSearch from './products/ProductSearch'

import TodoList from './todos/TodoList'
import TodoAdd from './todos/TodoAdd'
import TodoSearch from './todos/TodoSearch'


class App extends Component {
  state = {
    carts: [],
    cartSearch: [],
    products: [],
    productSearch: [],
    todos: [],
    todoSearch: '',
    showCompleted: false,
    test: ''
  }
  componentDidMount() {
    getCarts().then(carts => this.setState({ carts }))
    getProducts().then(products => this.setState({ products }))
    getTodos().then(todos => this.setState({ todos }))
  }


  handleCartAdd = (cart) => {
    const uuid = uuidV1()
    const newCart = { uuid, ...cart}
    this.setState({ carts: [ ...this.state.carts, newCart ]})
    addCart(newCart)
  }
  handleCartDelete = (_id, uuid) => {
    const updatedCarts = this.state.carts.filter(cart => cart.uuid !== uuid)
    this.setState({ carts: updatedCarts })
    deleteCart(_id)
  }
  handleCartSearch = (searchText) => {
    this.setState({ cartSearch: searchText.toLowerCase() })
  }



  handleProductAdd = (product) => {
    const uuid = uuidV1()
    const newProduct = { uuid, ...product }
    this.setState({ products: [ ...this.state.products, newProduct ] })
    addProduct(newProduct)
  }
  handleProductDelete = (_id, uuid) => {
    const updatedProducts = this.state.products.filter(product => product.uuid !== uuid)
    this.setState({ products: updatedProducts })
    deleteProduct(_id)
  }
  handleProductSearch = (searchText) => {
    this.setState({ productSearch: searchText.toLowerCase() })
  }




  handleTodoAdd = (todo) => {
    const uuid = uuidV1()
    const newTodo = { uuid, ...todo, completed: false }
    this.setState({ todos: [ ...this.state.todos, newTodo ] })
    addTodo(todo)
  }
  handleTodoUpdate = (uuid, update) => {
    console.log(uuid)
    const updated = this.state.todos.map(todo => todo.uuid === uuid)
    this.setState({ todos: updated })
    updateTodo()
  }
  handleTodoDelete = (_id, uuid) => {
    const updated = this.state.todos.filter(todo => todo.uuid !== uuid)
    this.setState({ todos: updated })
    deleteTodo(_id)
  }
  handleTodoToggle = (uuid) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.uuid === uuid) {
        todo.completed = !todo.completed
      }
      return todo
    })
    this.setState({ todos: updatedTodos })
  }

  handleTodoSearch = (showCompleted, searchText) => {
    this.setState({
      showCompleted,
      todoSearch: searchText.toLowerCase()
    })
  }

  render() {
    return (
      <div className="App">

        <h1>Cart</h1>
        <CartList
          carts={this.state.carts}
          onCartUpdate={this.handleCartUpdate}
          onCartDelete={this.handleCartDelete}
        />
        <CartAdd onCartAdd={this.handleCartAdd} />
        <CartSearch onSearch={this.handleCartSearch}/>

        <h1>Products</h1>
        <ProductList products={this.state.products} onCartAdd={this.handleCartAdd} onProductDelete={this.handleProductDelete} />
        <ProductAdd onProductAdd={this.handleProductAdd} />
        <ProductSearch onSearch={this.handleProductSearch} />

        <h1>Todos</h1>
        <TodoList todos={this.state.todos} onToggle={this.handleTodoToggle} onTodoDelete={this.handleTodoDelete} onTodoUpdate={this.handleTodoUpdate}/>
        <TodoAdd onTodoAdd={this.handleTodoAdd} />
        <TodoSearch onSearch={this.handleTodoSearch}/>

      </div>
    );
  }
}

export default App;
