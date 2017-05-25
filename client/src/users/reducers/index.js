import { type } from '../actions/index'

const user = (state = {
  roles: [],
  values: {},
  error: {}
}, action) => {
  switch(action.type) {
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `REQUEST_${type}`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `UPDATE_${type}`:
      console.log(action.item._id)
      return {
        ...state,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item } :
          item
        )
      }
    case `DELETE_${type}`:
      return {
        roles: [],
        values: [],
        error: null
      }
    case 'REDIRECT_USER':
      return {
        ...state,
        redirect: action.path
      }

    case 'ERROR_USER':
      return { ...state, error: action.error }

    case 'RECOVER_USER':
      return {
        ...state,
        ...action.recovery
      }
      case 'RESET_USER':
        return {
          ...state,
          ...action.user
        }
    case 'CONTACT_USER':
      return {
        ...state,
        message: action.values
      }
    default:
      return state
  }
}

export default user
