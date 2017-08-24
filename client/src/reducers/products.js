import { type } from '../actions/products'

const products = (state = {
  editItem: null
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        editItem: action.editItem
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        editItem: null
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

export default products
