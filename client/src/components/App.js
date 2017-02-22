import React, { Component } from 'react'
import uuidV1 from 'uuid/v1'

import {
  addCart,
  getCarts,
  updateCart,
  deleteCart,

  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,

  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  filterTodos
  } from '../api/AppAPI'

import './App.css';
import CartsPage from './carts/CartsPage'

import ProductsPage from './products/ProductsPage'
import ProductsAdminPage from './products/ProductsAdminPage'

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
    console.log(cart)
    const carts = [ ...this.state.carts ]
    const index = carts.findIndex(item => item.productId === cart.productId)
    if (index > -1) {
      const qty = parseInt(carts[index].productQty, 10)
      carts[index].productQty = qty + cart.productQty
      this.setState({ carts })
      updateCart(carts[index]._id, carts[index].productQty)
        .then(res => {
          const carts = [ ...this.state.carts ]
          console.log(carts)
          const index = carts.findIndex(item => item.uuid === res.cart.uuid)
          carts[index].productQty = res.cart.productQty
          this.setState({ carts })
        })
    } else {
      const uuid = uuidV1()
      const newCart = { uuid, ...cart}
      this.setState({ carts: [ ...this.state.carts, newCart ]})
      addCart(newCart)
        .then(() => getCarts().then(carts => this.setState({ carts })))
    }
  }
  handleCartUpdate = (_id, uuid, productQty) => {
    const carts = [ ...this.state.carts ]
    const index = carts.findIndex(item => item.uuid === uuid)
    carts[index].productQty = productQty
    updateCart(_id, productQty)
      .then(res => {
        const carts = [ ...this.state.carts ]
        const index = carts.findIndex(item => item.uuid === res.uuid)
        carts[index] = res
        this.setState({ carts })
      })
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
      .then(res => {
        const products = [ ...this.state.products ]
        const index = products.findIndex(item => item.uuid === res.uuid)
        products[index] = res
        this.setState({ products })
      })
  }
  handleProductUpdate = (update) => {
    const products = [ ...this.state.products ]
    const index = products.findIndex(item => item.uuid === update.uuid)
    products[index] = update
    updateProduct(update)
      .then(res => {
        const products = [ ...this.state.products ]
        const index = products.findIndex(item => item.uuid === res.uuid)
        products[index] = res
        this.setState({ products })
      })
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
    addTodo(newTodo)
      .then(res => {
        const todos = [ ...this.state.todos ]
        const index = todos.findIndex(item => item.uuid === res.uuid)
        todos[index] = res
        this.setState({ todos })
      })

  }
  handleTodoUpdate = (update) => {
    const todos = [ ...this.state.todos ]
    const index = todos.findIndex(item => item.uuid === update.uuid)
    todos[index] = update
    updateTodo(update)
      .then(res => {
        const todos = [ ...this.state.todos ]
        const index = todos.findIndex(item => item.uuid === res.uuid)
        todos[index] = res
        this.setState({ todos })
      })
  }
  handleTodoDelete = (_id, uuid) => {
    const updated = this.state.todos.filter(todo => todo.uuid !== uuid)
    this.setState({ todos: updated })
    console.log(_id)
    deleteTodo(_id).then(todo => console.log('Deleted: ', todo))
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
    const { todos, showCompleted, todoSearch } = this.state
    const filteredTodos = filterTodos(todos, showCompleted, todoSearch)
    return (
      <div className="App">

        <CartsPage
          carts={this.state.carts}
          onCartUpdate={this.handleCartUpdate}
          onCartDelete={this.handleCartDelete}
          onCartAdd={this.handleCartAdd}
          onSearch={this.handleCartSearch}
        />

        <ProductsPage
          products={this.state.products}
          onCartAdd={this.handleCartAdd}
          onSearch={this.handleProductSearch}
        />

        <ProductsAdminPage
          products={this.state.products}
          onProductUpdate={this.handleProductUpdate}
          onProductDelete={this.handleProductDelete}
          onProductAdd={this.handleProductAdd}
          onSearch={this.handleProductSearch}
        />

        <h1>Todos</h1>
        <TodoList todos={filteredTodos} onToggle={this.handleTodoToggle} onTodoDelete={this.handleTodoDelete} onTodoUpdate={this.handleTodoUpdate}/>
        <br />
        <TodoAdd onTodoAdd={this.handleTodoAdd} />
        <br />
        <TodoSearch onSearch={this.handleTodoSearch}/>

      </div>
    );
  }
}

export default App;
