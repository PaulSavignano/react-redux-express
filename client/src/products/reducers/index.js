import { combineReducers } from 'redux'
import { items, total } from './cart'

const cart = combineReducers({
  total,
  items,
})

export default cart
