import { type } from '../actions/search'

const search = (state = {
  open: false,
  searching: false,
  value: '',
}, action) => {
  switch (action.type) {
    case `TOGGLE_${type}`:
      return {
        ...state,
        open: action.open,
        searching: false,
        value: ''
      }
    case `ADD_${type}`:
      return {
        ...state,
        searching: true,
        value: action.value
      }
    case `DELETE_${type}`:
      return {
        ...state,
        open: false,
        searching: false,
        value: ''
      }
    default:
      return state
  }
}

export default search
