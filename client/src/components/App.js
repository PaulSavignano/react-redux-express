import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import CartList from './carts/CartList'
import CartAdd from './carts/CartAdd'
import ProductList from './products/ProductList'
import ProductAdd from './products/ProductAdd'
import TodoList from './todos/TodoList'
import TodoAdd from './todos/TodoAdd'


class App extends Component {
  state = {
    todos: [],
    products: [],
    carts: [],
    cities: []
  }
  async fetchTodos() {
    const response = await fetch('/api/todos')
    const data = await response.json()
    this.setState({ todos: data.todos })
  }
  async fetchProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    this.setState({ products: data.products })
  }
  async fetchCarts() {
    const response = await fetch('/api/carts')
    const data = await response.json()
    this.setState({ carts: data.carts })
  }
  async fetchCities() {
    const response = await fetch('/cities')
    const cities = await response.json()
    this.setState({ cities })
  }
  componentDidMount() {
    this.fetchTodos()
    this.fetchProducts()
    this.fetchCarts()
    this.fetchCities()
  }
  handleCartAdd = (productId, quantity) => {
    console.log(`new cart: ${productId}, quantity: ${quantity}`)
  }
  handleProductAdd = (name) => {
    console.log(`new product: ${name}`)
  }
  handleTodoAdd = (text) => {
    console.log(`new todo: ${text}`)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CartList carts={this.state.carts} />
        <CartAdd onCartAdd={this.handleCartAdd} />
        <ProductList products={this.state.products} />
        <ProductAdd onProductAdd={this.handleProductAdd} />
        <TodoList todos={this.state.todos} />
        <TodoAdd onTodoAdd={this.handleTodoAdd} />
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
