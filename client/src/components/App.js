import React, { Component } from 'react'
import uuidV1 from 'uuid/v1'

import {
  addCart,
  getCarts,
  updateCart,
  deleteCart,
  filterCarts,

  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  filterProducts,

  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  filterTodos
  } from '../api/AppAPI'

import './App.css';
import CartsPage from './carts/CartsPage'
import ProductsPage from './products/products/ProductsPage'
import ProductsAdminPage from './products/admin/ProductsAdminPage'
import TodosPage from '../todos/components/TodosPage'



class App extends Component {
  state = {
    carts: [],
    cartTotal: 0,
    cartSearch: [],
    products: [],
    productSearch: [],
    productAdminSearch: [],
    todos: [],
    todoSearch: '',
    showCompleted: false,
    test: ''
  }
  componentDidMount() {
    getCarts().then(carts => {
      this.setState({ carts })
      this.getCartTotal(carts)
    })
    getProducts().then(products => this.setState({ products }))
    getTodos().then(todos => this.setState({ todos }))
  }

  getCartTotal = (carts) => {
    if (carts.length > 1) {
      const cartTotal = carts.reduce((a, b) => {
        return (a.price * a.productQty) + (b.price * b.productQty)
      })
      this.setState({ cartTotal })
    } else if (carts.length > 0) {
      const cartTotal = carts[0].price * carts[0].productQty
      this.setState({ cartTotal })
    } else {
      this.setState({ cartTotal: 0 })
    }
  }

  handleCartAdd = (cart) => {
    const carts = [ ...this.state.carts ]
    const index = carts.findIndex(item => item.productId === cart.productId)
    if (index > -1) {
      const qty = parseInt(carts[index].productQty, 10)
      carts[index].productQty = qty + cart.productQty
      this.setState({ carts })
      updateCart(carts[index]._id, carts[index].productQty)
        .then(res => {
          const carts = [ ...this.state.carts ]
          const index = carts.findIndex(item => item.uuid === res.cart.uuid)
          carts[index].productQty = res.cart.productQty
          this.setState({ carts })
        })
    } else {
      const uuid = uuidV1()
      const products = [ ...this.state.products ]
      const product = products.find(product => product._id === cart.productId)
      const { name, description, price } = product
      const newCart = { uuid, ...cart, name, description, price }
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
  handleProductAdminSearch = (searchText) => {
    this.setState({ productAdminSearch: searchText.toLowerCase() })
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
    deleteTodo(_id).then(todo => console.log('Deleted: ', todo))
  }


  handleTodoSearch = (showCompleted, searchText) => {
    this.setState({
      showCompleted,
      todoSearch: searchText.toLowerCase()
    })
  }




  render() {
    const { todos, showCompleted, todoSearch, carts, cartSearch, products, productSearch, productAdminSearch } = this.state
    const filteredTodos = filterTodos(todos, showCompleted, todoSearch)
    const filteredCarts = filterCarts(carts, cartSearch)
    const filteredProducts = filterProducts(products, productSearch)
    const filteredProductsAdmin = filterProducts(products, productAdminSearch)
    return (
      <div className="App">

        <CartsPage
          carts={filteredCarts}
          cartTotal={this.state.cartTotal}
          onCartUpdate={this.handleCartUpdate}
          onCartDelete={this.handleCartDelete}
          onCartAdd={this.handleCartAdd}
          onSearch={this.handleCartSearch}
        />

        <ProductsPage
          products={filteredProducts}
          onCartAdd={this.handleCartAdd}
          onSearch={this.handleProductSearch}
        />

        <ProductsAdminPage
          products={filteredProductsAdmin}
          onProductUpdate={this.handleProductUpdate}
          onProductDelete={this.handleProductDelete}
          onProductAdd={this.handleProductAdd}
          onSearch={this.handleProductAdminSearch}
        />

        <TodosPage/>

      </div>
    );
  }
}

export default App;
