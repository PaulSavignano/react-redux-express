import { type } from '../actions/index'

const theme = (state = {}, action) => {
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
        ...action.items
      }
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `UPDATE_${type}`:
      console.log(action.item)
      return {
        ...state,
        ...action.item,
        testing: 1
      }
    case `DELETE_${type}`:
      return {
        ...state,
        ...state.items
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

export default theme
