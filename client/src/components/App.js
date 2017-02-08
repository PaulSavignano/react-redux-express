import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import TodoList from './todos/TodoList'
import ProductList from './products/ProductList'

class App extends Component {
  state = {
    todos: [],
    products: [],
    cities: []
  }
  async fetchTodos() {
    const response = await fetch('/api/todos')
    const todos = await response.json()
    this.setState({ todos })
  }
  async fetchProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    console.log(data.products)
    this.setState({ products: data.products })
  }
  async fetchCities() {
    const response = await fetch('/cities')
    const cities = await response.json()
    this.setState({ cities })
  }
  componentDidMount() {
    this.fetchTodos()
    this.fetchProducts()
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
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
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
