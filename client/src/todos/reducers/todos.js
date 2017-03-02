import moment from 'moment'

export const searchTodos = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_TODOS':
      return action.searchTodosText
    default:
      return state
  }
}

export const showCompleted = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state
    default:
      return state
  }
}

export const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ]
    case 'FETCH_TODOS':
      return [
        ...state,
        ...action.todos
      ]
    case 'UPDATE_TODO':
    return state.map(todo =>
      todo._id === action._id ?
        { ...todo, ...action.updates } :
        todo
      )
    case 'DELETE_TODO':
      return state.filter(todo =>
        todo._id !== action._id
      )
    default:
      return state
  }
}
