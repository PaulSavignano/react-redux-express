import { combineReducers } from 'redux'
import { searchProducts, products } from './products'

const productsReducer = combineReducers({
  searchProducts,
  products
})

export default productsReducer
