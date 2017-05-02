export const user = (state = {
  isFetching: false,
  name: '',
  roles: [],
  message: '',
  error: ''
}, action) => {
  switch(action.type) {
    case 'REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'SUCCESS':
      return {
        ...state,
        isFetching: false,
        ...action.user
      }
    case 'ERROR':
      return { ...state, error: action.error }
    case 'DELETE':
      return {
        isFetching: false,
        name: '',
        roles: [],
        message: '',
        error: ''
      }
    case 'RECOVER':
      return {
        ...state,
        ...action.recovery
      }
    case 'CONTACT':
      return {
        ...state,
        message: action.values
      }
    default:
      return state
  }
}
