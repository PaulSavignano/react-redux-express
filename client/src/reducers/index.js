import { combineReducers } from 'redux'
import { todoSearchReducer, showCompletedReducer, todosReducer } from './todoReducers'

const rootReducer = combineReducers({
  searchText: todoSearchReducer,
  showCompleted: showCompletedReducer,
  todos: todosReducer
})

export default rootReducer
