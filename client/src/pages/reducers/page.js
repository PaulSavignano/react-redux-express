export const pages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        ...state,
        items: action.page
      }
    case 'FETCH_PAGE':
      return {
        ...state,
        isFetching: false,
        items: action.pages
      }
    case 'REQUEST_PAGES':
      return {
        ...state,
        isFetching: true
      }
    case 'UPDATE_PAGE':
    return {
      ...state,
      items: state.pages.map(page => page._id === action._id ?
        { ...page, ...action.updates } :
        page
      )
    }
    case 'DELETE_PAGE':
      return {
        ...state,
        items: state.pages.filter(page => page._id !== action._id)
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
