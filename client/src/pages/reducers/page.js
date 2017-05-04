export const pages = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_PAGES':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PAGES':
      return {
        ...state,
        isFetching: false,
        items: action.pages
      }
    case 'ADD_PAGE':
      return {
        ...state,
        isFetching: false,
        items: [action.page]
      }
    case 'UPDATE_PAGE':
      return {
        ...state,
        items: state.items.map(page => page._id === action.update._id ?
          { ...page, ...action.update } :
          page
        )
      }
    case 'DELETE_PAGE':
      return {
        ...state,
        items: state.items.filter(page => page._id !== action._id)
      }
    case 'ERROR_PAGE':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
