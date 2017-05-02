export const order = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        ...action.order
      }
    case 'ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
