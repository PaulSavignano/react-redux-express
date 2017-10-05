import { type } from '../actions/orders'

const orders = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case `REQUEST_${type}S`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}S`:
      return {
        ...state,
        isFetching: false,
        items: action.items
      }
    case `ADD_${type}`:
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
    case `DELETE_${type}S`:
      return {
        ...state,
        items: [],
        isFetching: false
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
    default:
      return state
  }
}

export default orders
