import moment from 'moment'

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

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'TODO_ADD':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    case 'TODO_TOGGLE':
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
