import React, { Component } from 'react';

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
    const data = await response.json()
    this.setState({ carts: data.carts })
  }
  handleCartSearch = (cartSearch) => {
    this.setState({ cartSearch: cartSearch.toLowerCase() })
  }

  async fetchProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    this.setState({ products: data.products })
  }
  handleProductSearch = (productSearch) => {
    this.setState({ productSearch: productSearch.toLowerCase() })
  }

  async fetchTodos() {
    const response = await fetch('/api/todos')
    const data = await response.json()
    this.setState({ todos: data.todos })
  }
  handleTodoSearch = (showCompleted, todoSearch) => {
    this.setState({
      showCompleted,
      todoSearch: todoSearch.toLowerCase()
    })
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
  handleSearch = (showCompleted, searchText) => {
    this.setState({
      showCompleted, searchText: searchText.toLowerCase()
    })
  }
  render() {
    return (
      <div className="App">

        <CartList carts={this.state.carts} />
        <CartAdd onCartAdd={this.handleCartAdd} />
        <CartSearch onSearch={this.handleCartSearch}/>

        <ProductList products={this.state.products} />
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
