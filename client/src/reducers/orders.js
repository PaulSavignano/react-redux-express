import { type } from '../actions/orders'

const orders = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case 'REQUEST_ORDERS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_ORDERS':
      return {
        ...state,
        isFetching: false,
        items: action.items
      }
    case 'ADD_ORDER':
      return {
        ...state,
        items: [
          ...state.items,
          action.item
        ]
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item } :
          item
        )
      }
    case 'ERROR_ORDER':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default orders
