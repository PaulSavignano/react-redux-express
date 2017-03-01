import expect from 'expect'
import { setTodoSearch, todoAdd, toggleShowCompleted, todoToggle } from './todoActions'

describe('todoActions', () => {
  it('should generate todo search text action', () => {
    const action = {
      type: 'SET_TODO_SEARCH',
      searchText: 'Some search text'
    }
    const res = setTodoSearch(action.searchText)
    expect(res).toEqual(action)
  })
  it('should generate todo add action', () => {
    const action = {
      type: 'TODO_ADD',
      text: 'Thing to do'
    }
    const res = todoAdd(action.text)
    expect(res).toEqual(action)
  })
  it('should generate toggle show completed action', () => {
    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    const res = toggleShowCompleted()
    expect(res).toEqual(action)
  })
})
