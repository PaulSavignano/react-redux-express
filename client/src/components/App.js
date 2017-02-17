import React, { Component } from 'react'
import uuidV1 from 'uuid/v1'

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
    cities: []
  }
  async fetchCarts() {
    const response = await fetch('/api/carts')
    const carts = await response.json()
    this.setState({ carts })
  }
  handleCartAdd = (cart) => {
    const uuid = uuidV1()
    const newCart = { uuid, ...cart}
    this.setState({ carts: [ ...this.state.carts, newCart ]})
    fetch('/api/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCart)
    })
      .then(res => res.json())
      .then(carts => this.setState({ carts: [ ...this.state.carts ]}))
      .catch(err => console.log(err))
  }
  handleCartSearch = (searchText) => {
    this.setState({ cartSearch: searchText.toLowerCase() })
  }



  async fetchProducts() {
    const response = await fetch('/api/products')
    const products = await response.json()
    this.setState({ products })
  }
  handleProductAdd = (product) => {
    const uuid = uuidV1()
    const newProduct = { uuid, ...product }
    this.setState({ products: [ ...this.state.products, newProduct ] })
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(products => this.setState({ products: [...this.state.products ] }))
      .catch(err => console.log(err))
  }
  handleProductSearch = (searchText) => {
    this.setState({ productSearch: searchText.toLowerCase() })
  }



  async fetchTodos() {
    const response = await fetch('/api/todos')
    const todos = await response.json()
    this.setState({ todos })
  }
  handleTodoAdd = (todo) => {
    const uuid = uuidV1()
    const newTodo = { uuid, ...todo }
    this.setState({ todos: [ ...this.state.todos, newTodo ] })
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(todos => this.setState({ todos: [...this.state.todos ] }))
      .catch(err => console.log(err))
  }
  handleTodoSearch = (showCompleted, searchText) => {
    this.setState({
      showCompleted,
      todoSearch: searchText.toLowerCase()
    })
  }

  componentWillMount() {
    this.fetchCarts()
    this.fetchProducts()
    this.fetchTodos()
  }
  render() {
    return (
      <div className="App">

        <CartList carts={this.state.carts} />
        <CartAdd onCartAdd={this.handleCartAdd} />
        <CartSearch onSearch={this.handleCartSearch}/>

        <ProductList products={this.state.products} onCartAdd={this.handleCartAdd} />
        <ProductAdd onProductAdd={this.handleProductAdd} />
        <ProductSearch onSearch={this.handleProductSearch} />

        <TodoList todos={this.state.todos} />
        <TodoAdd onTodoAdd={this.handleTodoAdd} />
        <TodoSearch onSearch={this.handleTodoSearch}/>

        <ul>
          {this.state.cities.map(city => (
            <li key={city.name}>{city.name}: {city.population}</li>
          )
          )}
        </ul>
      </div>
    );
  }
}

export default App;
