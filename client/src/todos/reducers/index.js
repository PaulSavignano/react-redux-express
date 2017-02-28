import { combineReducers } from 'redux'
import { searchTodos, showCompleted, todos } from './todos'

const todosReducer = combineReducers({
  searchTodos,
  showCompleted,
  todos
})

export default todosReducer
