import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import todoSeeds from '../seed'
import {
  startAddTodo,
  addTodo,
  startFetchTodos,
  fetchTodos,
  startUpdateTodo,
  updateTodo,
  startDeleteTodo,
  deleteTodo,
  searchTodos,
  toggleShowCompleted
} from './index'

const mockStore = configureMockStore([thunk])

describe('Todo App Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })


  // Create
  it('should generate ADD_TODO action', () => {
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
    return store.dispatch(startAddTodo(todoSeeds[0]))
      .then((res) => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
      .catch(err => console.log(err))
  })



  // Read
  it('should generate FETCH_TODOS action', () => {
    const action = {
      type: 'ADD_TODO',
      todo: todoSeeds[0]
    }
    const res = addTodo(action.todo)
    expect(res).toEqual(action)
  })
  it('should FETCH_TODOS when startFetchTodos is complete', () => {
    nock('http://localhost/')
      .get('/api/todos')
      .reply(200, { todos: todoSeeds })
    const expectedAction = { type: 'FETCH_TODOS' }
    const store = mockStore({ todos: [] })
    return store.dispatch(startFetchTodos())
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
  })



  // Update
  it('should generate UPDATE_TODO action', () => {
    const action = {
      type: 'UPDATE_TODO',
      _id: todoSeeds[0]._id,
      updates: { text: 'updating todo text', completed: true }
    }
    const res = updateTodo(action._id, action.updates)
    expect(res).toEqual(action)
  })
  it('should UPDATE_TODOS when startUpdateTodos is complete', () => {
    const updates = {
      text: 'Updated Text'
    }
    nock('http://localhost/')
      .intercept(`/api/todos/${todoSeeds[0]._id}`, 'PATCH')
      .reply(200, { todo: todoSeeds[0] })
    const expectedAction = { type: 'UPDATE_TODO' }
    const store = mockStore({ todos: [] })
    return store.dispatch(startUpdateTodo(todoSeeds[0]._id, updates))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
  })







  // Delete
  it('should generate DELETE_TODO action', () => {
    const action = {
      type: 'DELETE_TODO',
      _id: todoSeeds[0]._id
    }
    const res = deleteTodo(action._id)
    expect(res).toEqual(action)
  })
  it('should DELETE_TODO when startDeleteTodo is complete', () => {
    nock('http://localhost/')
      .intercept(`/api/todos/${todoSeeds[0]._id}`, 'DELETE')
      .reply(200, { todo: todoSeeds[0] })
    const expectedAction = { type: 'DELETE_TODO' }
    const store = mockStore({ todos: [] })
    return store.dispatch(startDeleteTodo(todoSeeds[0]._id))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type)
      })
  })






  it('should generate SEARCH_TODOS action', () => {
    const action = {
      type: 'SEARCH_TODOS',
      searchTodosText: 'Some search text'
    }
    const res = searchTodos(action.searchTodosText)
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
