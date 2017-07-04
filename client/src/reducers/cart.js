import { type } from '../actions/cart'

const cart = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case `REQUEST_${type}`:
      return {
        ...state,
        isFetching: true
      }
    case `ADD_${type}`:
      return {
        ...state,
        ...action.cart
      }
    case `RECEIVE_${type}`:
      return {
        ...state,
        ...action.cart,
        isFetching: false
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        ...action.cart
      }
    case `DELETE_${type}`:
      return {
        isFetching: false
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default cart
