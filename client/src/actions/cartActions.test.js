import expect from 'expect'
import { setCartSearch, cartAdd } from './cartActions'

import carts from '../components/carts/seed'

describe('cartActions', () => {
  it('should generate cart search text action', () => {
    const action = {
      type: 'SET_CART_SEARCH',
      searchText: 'Some search text'
    }
    const res = setCartSearch(action.searchText)
    expect(res).toEqual(action)
  })
  it('should generate an add to cart action', () => {
    const action = {
      type: 'CART_ADD',
      cart: carts[0]
    }
    const res = cartAdd(action.cart)
    expect(res).toEqual(action)
  })
})
