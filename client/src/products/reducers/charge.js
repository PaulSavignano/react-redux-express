export const charge = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHARGE':
      return [
        ...state,
        action.charge
      ]
    default:
      return state
  }
}
