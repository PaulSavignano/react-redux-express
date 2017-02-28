import expect from 'expect'
import { searchTodos, addTodo, toggleShowCompleted, toggleTodo } from './index'

describe('Todo App Actions', () => {
  it('should generate todo search text action', () => {
    const action = {
      type: 'SET_TODO_SEARCH',
      searchText: 'Some search text'
    }
    const res = searchTodos(action.searchText)
    expect(res).toEqual(action)
  })
  it('should generate add todo action', () => {
    const action = {
      type: 'TODO_ADD',
      todo: {
        text: 'Thing to do'
      }
    }
    const res = addTodo(action.todo)
    expect(res).toEqual(action)
  })
  it('should generate toggle show completed action', () => {
    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    const res = toggleShowCompleted()
    expect(res).toEqual(action)
  })
  it('should generate toggle todo action', () => {
    const action = {
      type: 'TOGGLE_TODO',
      _id: '123'
    }
    const res = todoToggle(action._id)
    expect(res).toEqual(action)
  })
})
