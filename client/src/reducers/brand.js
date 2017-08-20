import { type } from '../actions/brand'

const brand = (state = {
  isFetching: false,
  appBar: { values: {}},
  article: { values: {}},
  body: {values: {}},
  business: {},
  card: { values: {}},
  footer: { values: {}},
  hero: { values: {}},
  theme: {},
  typography: { values: {}}
}, action) => {
  switch (action.type) {
    case `REQUEST_${type}S`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}S`:
      return {
        ...state,
        isFetching: false,
        ...action.items
      }
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        ...action.item
      }
    case `DELETE_${type}`:
      return {
        ...state,
        ...state.items
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

export default brand
