import { type } from '../actions/heros'

const heros = (state = {
  editItem: null,
  autoplay: true
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        editItem: action.editItem,
        autoplay: false
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        editItem: null,
        autoplay: true
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

export default heros
