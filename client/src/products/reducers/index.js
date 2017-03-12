import { combineReducers } from 'redux'
import { searchProducts, products } from './products'
import { searchCartProducts, cart } from './cart'

const productsReducer = combineReducers({
  searchProducts,
  products,
  searchCartProducts,
  cart
})

export default productsReducer
