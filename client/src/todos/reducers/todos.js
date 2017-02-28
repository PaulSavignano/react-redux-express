import moment from 'moment'

export const searchTodos = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_TODOS':
      return action.searchText
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
      todo._id === action.todo._id ?
        { ...todo } :
        todo
      )
    case 'DELETE_TODO':
      return state.filter(todo =>
        todo._id !== action._id
      )
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo._id === action._id) {
          const nextCompleted = !todo.completed
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: nextCompleted ? moment().unix() : undefined
          }
        } else {
          return todo
        }
      })
    default:
      return state
  }
}
