import { type } from '../actions/index'

const search = (state = {
  value: '',
  searching: false
}, action) => {
  switch (action.type) {
    case `TOGGLE_${type}`:
    console.log(action.searching)
      return {
        ...state,
        searching: action.searching
      }
    case `ADD_${type}`:
      return {
        ...state,
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
