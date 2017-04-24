export const pages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PAGE':
    console.log('adding page', action.page)
      return {
        ...state,
        isFetching: false,
        items: [action.page]
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
      console.log(action.update)
      return {
        ...state,
        items: state.items.map(page => page._id === action.update._id ?
          { ...page, ...action.update } :
          page
        )
      }
    case 'DELETE_PAGE':
    console.log(state)
      return {
        ...state,
        items: state.items.filter(page => page._id !== action._id)
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
