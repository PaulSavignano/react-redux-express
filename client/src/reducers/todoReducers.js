import uuidV1 from 'uuid/v1'
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
  console.log(action.todosReducer)
  switch (action.type) {
    case 'TODO_ADD':
      return [
        ...state,
        {
          uuid: uuidV1(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    case 'TODO_TOGGLE':
      return state.map((todo) => {
        if (todo.uuid === action.uuid) {
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
