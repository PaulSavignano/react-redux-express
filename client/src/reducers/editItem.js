import { type } from '../actions/editItem'

const editItem = (state = {
  autoplay: true,
  editing: false,
  item: null,
  kind: null,
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        autoplay: false,
        editing: true,
        item: action.item,
        kind: action.kind,
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        autoplay: true,
        editing: false,
        item: null,
        kind: null,
      }
    default:
      return state
  }
}

export default editItem
