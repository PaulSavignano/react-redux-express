import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import expect from 'expect'
import ProductList from './ProductList'
import Product from './Product'

describe('ProductList', () => {
  it('should exist', () => {
    expect(ProductList).toExist()
  })
  it('should render one Product component for each todo item', () => {
    const products = [
      { _id: 1, name: 'Play with Westie', description: 'A priceless offering', price: 30000 },
      { _id: 2, name: 'Walk Pepper', description: 'An enjoyable stroll with the bear', price: 2000 },
      { _id: 3, name: 'Eat dinner', description: 'A nice break from the day', price: 1000 },
    ]
    const productList = TestUtils.renderIntoDocument(<ProductList products={products} />)
    const todosComponents = TestUtils.scryRenderedComponentsWithType(productList, Product)
    expect(todosComponents.length).toBe(products.length)
  })
})
