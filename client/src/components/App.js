import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import TodoList from './todos/TodoList'
import ProductList from './products/ProductList'
import Cart from './cart/Cart'

class App extends Component {
  state = {
    todos: [],
    products: [],
    cartProducts: [],
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
  async fetchCart() {
    const response = await fetch('/api/cart')
    const data = await response.json()
    this.setState({ cartProducts: data.cartProducts })
  }
  async fetchCities() {
    const response = await fetch('/cities')
    const cities = await response.json()
    this.setState({ cities })
  }
  componentDidMount() {
    this.fetchTodos()
    this.fetchProducts()
    this.fetchCart()
    this.fetchCities()
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
        <TodoList todos={this.state.todos} />
        <ProductList products={this.state.products} />
        <Cart cartProducts={this.state.cartProducts} />
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
