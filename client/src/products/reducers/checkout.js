export const checkout = (state = [], action) => {
  switch (action.type) {
    case 'CHECKOUT':
      return [
        ...state,
        action.charge
      ]
    case 'CHARGE_ERROR':
      return [
        ...state,
        action.err
      ]
    default:
      return state
  }
}
