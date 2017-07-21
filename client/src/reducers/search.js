import { type } from '../actions/search'

const search = (state = {
  value: '',
  searching: false
}, action) => {
  switch (action.type) {
    case `TOGGLE_${type}`:
      return {
        ...state,
        searching: action.searching,
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
        searching: false,
        value: ''
      }
    default:
      return state
  }
}

export default search
