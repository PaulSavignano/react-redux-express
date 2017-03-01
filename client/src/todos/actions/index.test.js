import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { fetchTodos, searchTodos, postTodo, addTodo, toggleShowCompleted, patchToggleTodo } from './index'
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

  it('should ADD_TODO when postTodo is complete', () => {
    nock('http://localhost/')
      .post('/api/todos')
      .reply(200, { todos: todoSeeds })
    const expectedAction = { type: 'ADD_TODO' }
    const store = mockStore()
    return store.dispatch(postTodo(todoSeeds[0]))
      .then((res) => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
      .catch(err => console.log(err))
  })

  it('should FETCH_TODOS when fetchTodos is complete', () => {
    nock('http://localhost/')
      .get('/api/todos')
      .reply(200, { body: { todos: todoSeeds }})
    const expectedAction = { type: 'FETCH_TODOS' }
    const store = mockStore({ todos: [] })
    return store.dispatch(fetchTodos())
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
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
    const res = patchToggleTodo(action._id)
    expect(res).toEqual(action)
  })
})
