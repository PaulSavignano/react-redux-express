export const setTodoSearch = (searchText) => {
  return {
    type: 'SET_TODO_SEARCH',
    searchText
  }
}

export const todoAdd = (text) => {
  return {
    type: 'TODO_ADD',
    text
  }
}

export const toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  }
}
