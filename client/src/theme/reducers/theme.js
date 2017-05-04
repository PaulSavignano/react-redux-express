const theme = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_THEME':
    console.log('requesting theme')
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_THEME':
    console.log('receiving theme')
      return {
        ...state,
        ...action.item,
        isFetching: false,
      }
    case 'ADD_THEME':
      return {
        ...state,
        error: '',
        ...action.item,
        isFetching: false,
      }
    case 'UPDATE_THEME':
      return {
        ...state,
        error: '',
        ...state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item } :
          item
        )
      }
    case 'DELETE_THEME':
      return {
        ...state,
        error: '',
        ...state.items.filter(item => item._id !== item._id)
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

export default theme
