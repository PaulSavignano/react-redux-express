import { type } from '../actions/sections'

const sections = (state = {
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
    case `ADD_${type}`:
      return {
        ...state,
        editItem: action.editItem
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        editItem: null
      }
    default:
      return state
  }
}

export default sections
