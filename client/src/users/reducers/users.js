export const user = (state = {}, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, ...action.user, authenticated: true, error: null }
    case 'UNAUTH_USER':
      return { ...state, authenticated: false, error: null}
    case 'AUTH_ERROR':
      return { ...state, error: action.error }
    case 'ERROR':
      return { ...state, error: action.error }
    case 'CONTACT_USER':
      return { ...state, message: action.values }
    default:
      return state
  }
}
