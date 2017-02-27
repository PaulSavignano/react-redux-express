export const setTodoSearch = (todoSearch) => {
  return {
    type: 'SET_TODO_SEARCH',
    todoSearch
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

export const todoToggle = (uuid) => {
  return {
    type: 'TODO_TOGGLE',
    uuid
  }
}
