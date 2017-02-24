import expect from 'expect'
import { setProductSearch, productAdd } from './productActions'

import products from '../components/products/seed'

describe('productActions', () => {
  it('should generate product search text action', () => {
    const action = {
      type: 'SET_PRODUCT_SEARCH',
      searchText: 'Some search text'
    }
    const res = setProductSearch(action.searchText)
    expect(res).toEqual(action)
  })
  it('should generate a productAdd action', () => {
    const action = {
      type: 'PRODUCT_ADD',
      product: products[0]
    }
    const res = productAdd(action.product)
    expect(res).toEqual(action)
  })
})
