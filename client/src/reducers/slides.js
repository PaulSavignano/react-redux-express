import { type } from '../actions/slides'

const slides = (state = {
  isFetching: true,
  items: [],
  open: false,
  autoplay: true
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action._id ?
          { ...item, editing: true } :
          item
        ),
        autoplay: false
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action._id ?
          { ...item, editing: false } :
          item
        ),
        autoplay: true
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
          { ...action.item, editing: true }
        ],
        open: true,
        autoplay: false
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item, editing: false } :
          item
        ),
        autoplay: true
      }
    case `DELETE_${type}`:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action._id)
      }
    case `DELETE_${type}S`:
      return {
        ...state,
        items: state.items.filter(item => action.items.indexOf(item._id) === -1),
        autoplay: true
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error
      }
    case `TOGGLE_${type}`:
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}

export default slides