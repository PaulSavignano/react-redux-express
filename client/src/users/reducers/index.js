const user = (state = {
  roles: [],
  values: {},
  error: {}
}, action) => {
  switch(action.type) {
    case 'REQUEST_USER':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_USER':
      return {
        ...state,
        isFetching: false,
        ...action.user
      }
    case 'REDIRECT_USER':
      return {
        ...state,
        redirect: action.path
      }
    case 'ERROR_USER':
      return { ...state, error: action.error }
    case 'DELETE_USER':
      return {
        roles: [],
        values: [],
        error: null
      }
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
