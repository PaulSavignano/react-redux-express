import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import ProductAdminList from './ProductAdminList'
import ProductAdmin from './ProductAdmin'

import products from '../seed'

describe('ProductList', () => {
  it('should exist', () => {
    expect(ProductAdminList).toExist()
  })
  it('should render one Product component for each todo item', () => {
    const component = TestUtils.renderIntoDocument(<ProductAdminList products={products} />)
    const components = TestUtils.scryRenderedComponentsWithType(component, ProductAdmin)
    expect(components.length).toBe(products.length)
  })
})
