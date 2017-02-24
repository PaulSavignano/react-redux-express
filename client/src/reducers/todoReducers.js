export const todoSearchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TODO_SEARCH':
      return action.searchText
    default:
      return state
  }
}

export const showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state
    default:
      return state
  }
}
