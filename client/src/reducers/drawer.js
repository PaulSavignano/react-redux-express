import { type } from '../actions/drawer'

const drawer = (state = {
  open: false
}, action) => {
  switch (action.type) {
    case `TOGGLE_${type}`:
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}

export default drawer
