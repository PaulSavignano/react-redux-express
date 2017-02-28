import expect from 'expect'
import deepFreeze from 'deep-freeze-strict'
import { searchTodos, showCompleted, todos } from './todos'
import todoSeeds from '../seed'

describe('Todo Reducers', () => {
  describe('searchTodos', () => {
    it('should set searchText', () => {
      const action = {
        type: 'SEARCH_TODOS',
        searchText: 'dog'
      }
      const res = searchTodos(deepFreeze(''), deepFreeze(action))
      expect(res).toEqual(action.searchText)
    })
  })
  describe('showCompleted', () => {
    it('should toggle showCompleted', () => {
      const action = {
        type: 'TOGGLE_SHOW_COMPLETED',
      }
      const res = showCompleted(deepFreeze(false), deepFreeze(action))
      expect(res).toEqual(true)
    })
  })
  describe('todos', () => {
    it('should add a new todo', () => {
      const action = {
        type: 'ADD_TODO',
        todo: todoSeeds[0]
      }
      const res = todos(deepFreeze([]), deepFreeze(action))
      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(action.todo)
    })
  })
})
