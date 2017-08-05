import { type } from '../actions/sections'

const sections = (state = {
  isFetching: true,
  items: []
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action._id ?
          { ...item, editing: true } :
          item
        )
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action._id ?
          { ...item, editing: false } :
          item
        )
      }
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
          action.item
        ]
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item, editing: false } :
          item
        )
      }
    case `UPDATE_ORDER_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action.item.sectionId ?
          { ...item, components: item.components.map(comp => comp._id === action.item.componentId ? { ...comp, index: action.item.index } : comp) } :
          item
        )
      }
    case `DELETE_${type}`:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action._id)
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

export default sections