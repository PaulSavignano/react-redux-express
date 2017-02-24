import expect from 'expect'
import { filterTodos, filterCarts, filterProducts } from './AppAPI'

import carts from '../components/carts/seed'
import products from '../components/products/seed'
import todos from '../components/todos/seed'

describe('filterTodos', () => {
  it('should return all items if showCompleted is true', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos.length).toBe(3)
  })
  it('should return all items if showCompleted is false', () => {
    const filteredTodos = filterTodos(todos, false, '')
    expect(filteredTodos.length).toBe(2)
  })
  it('should sort by completed status', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos[0].completed).toBe(false)
  })
  it('should filter todos by searchText', () => {
    const filteredTodos = filterTodos(todos, true, 'Pepper')
    expect(filteredTodos.length).toBe(1)
  })
  it('should return all todos if searchText is empty', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos.length).toBe(3)
  })
})

describe('filterCarts', () => {
  it('should filter carts by searchText', () => {
    const filteredCarts = filterCarts(carts, 'React')
    expect(filteredCarts.length).toBe(1)
  })
  it('should return all carts if searchText is empty', () => {
    const filteredCarts = filterCarts(carts, '')
    expect(filteredCarts.length).toBe(3)
  })
})

describe('filterProducts', () => {
  it('should filter products by searchText', () => {
    const filteredProducts = filterProducts(products, 'React')
    expect(filteredProducts.length).toBe(1)
  })
  it('should return all products if searchText is empty', () => {
    const filteredProducts = filterProducts(products, '')
    expect(filteredProducts.length).toBe(3)
  })
})
