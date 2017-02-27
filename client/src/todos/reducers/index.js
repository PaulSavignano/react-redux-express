import { combineReducers } from 'redux'
import { todoSearch, showCompleted, todos } from './todos'

const todosReducer = combineReducers({
  todoSearch,
  showCompleted,
  todos
})

export default todosReducer
