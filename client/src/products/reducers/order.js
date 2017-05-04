export const order = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_ORDERS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_ORDERS':
      return {
        ...state,
        isFetching: false
      }
    case 'ADD_ORDER':
      return {
        ...state,
        ...action.order
      }
    case 'ERROR_ORDER':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
