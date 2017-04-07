export const user = (state = {}, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, ...action.user, authenticated: true, error: null }
    case 'UNAUTH_USER':
      return { }
    case 'AUTH_ERROR':
      return { ...state, ...action.error }
    default:
      return state
  }
}
