import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductList from './ProductList'
import Product from './Product'
import products from '../seed'

describe('ProductList', () => {
  it('should exist', () => {
    expect(ProductList).toExist()
  })
  it('should render one Product component for each todo item', () => {
    const component = TestUtils.renderIntoDocument(<ProductList products={products} />)
    const components = TestUtils.scryRenderedComponentsWithType(component, Product)
    expect(components.length).toBe(products.length)
  })
})
