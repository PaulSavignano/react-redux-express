import { combineReducers } from 'redux'
import { items, total, qty } from './cart'

const cart = combineReducers({
  total,
  qty,
  items,
})

export default cart
