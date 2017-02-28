import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { searchTodos, postTodo, addTodo, toggleShowCompleted, toggleTodo } from './index'
import todoSeeds from '../seed'

const mockStore = configureMockStore([thunk])


describe('Todo App Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('should generate todo search text action', () => {
    const action = {
      type: 'SEARCH_TODOS',
      searchText: 'Some search text'
    }
    const res = searchTodos(action.searchText)
    expect(res).toEqual(action)
  })

  it('should generate add todo action', () => {
    const action = {
      type: 'ADD_TODO',
      todo: todoSeeds[0]
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
    const res = toggleTodo(action._id)
    expect(res).toEqual(action)
  })
})
