import { type } from '../actions/users'

const users = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch(action.type) {
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
        isFetching: false,
        items: [
          ...state.items,
          { ...action.item, editing: true }
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
    case `DELETE_${type}`:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action._id)
      }
    case `DELETE_ALL_${type}`:
      return {
        ...state,
        items: []
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

export default users
