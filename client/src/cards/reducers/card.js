const cards = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_CARDS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_CARDS':
      return {
        ...state,
        items: action.items,
        isFetching: false,
      }
    case 'ADD_CARD':
      return {
        ...state,
        error: '',
        items: [
          ...state.items,
          action.item
        ],
        isFetching: false,
      }
    case 'UPDATE_CARD':
      return {
        ...state,
        error: '',
        items: state.items.map(product => product._id === action.product._id ?
          { ...product, ...action.product } :
          product
        )
      }
    case 'DELETE_CARD':
      return {
        ...state,
        error: '',
        items: state.items.filter(product => product._id !== action._id)
      }
    case 'ERROR_THEME':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default cards
