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
    const data = await response.json()
    console.log(data)
    this.setState({ carts: data })
  }
  handleCartAdd = (cart) => {
    fetch('/api/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })
      .then(res => res.json())
      .then(carts => this.fetchCarts())
      .catch(err => console.log(err))
  }
  handleCartSearch = (searchText) => {
    this.setState({ cartSearch: searchText.toLowerCase() })
  }


  async fetchProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    this.setState({ products: data.products })
  }
  handleProductAdd = (product) => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(products => this.setState({ products: [...this.state.products, products ] }))
      .catch(err => console.log(err))
  }
  handleProductSearch = (searchText) => {
    this.setState({ productSearch: searchText.toLowerCase() })
  }


  async fetchTodos() {
    const response = await fetch('/api/todos')
    const data = await response.json()
    this.setState({ todos: data.todos })
  }
  handleTodoAdd = (text) => {
    const uuid = uuidV1()
    const newTodo = { uuid, text }
    this.setState({
      todos: [
        ...this.state.todos,
        newTodo
      ]
    })
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


  async fetchCities() {
    const response = await fetch('/cities')
    const cities = await response.json()
    this.setState({ cities })
  }
  componentWillMount() {
    this.fetchCarts()
    this.fetchProducts()
    this.fetchTodos()
    this.fetchCities()
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
