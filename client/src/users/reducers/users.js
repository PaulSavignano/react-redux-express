export const user = (state = {}, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, ...action.user, authenticated: true, error: null }
    case 'UNAUTH_USER':
      return { ...state, authenticated: false }
    case 'AUTH_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
