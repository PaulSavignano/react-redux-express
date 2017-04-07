import { combineReducers } from 'redux'
import { items, total, qty } from './cart'

const cart = combineReducers({
  total,
  items,
  qty
})

export default cart
