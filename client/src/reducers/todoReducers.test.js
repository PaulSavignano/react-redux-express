import expect from 'expect'
import deepFreeze from 'deep-freeze-strict'
import { todoSearchReducer, showCompletedReducer, todosReducer } from './todoReducers'

describe('todoReducers', () => {
  describe('todoSearchReducer', () => {
    it('should set searchText', () => {
      const action = {
        type: 'SET_TODO_SEARCH',
        searchText: 'dog'
      }
      const res = todoSearchReducer(deepFreeze(''), deepFreeze(action))
      expect(res).toEqual(action.searchText)
    })
  })
  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      const action = {
        type: 'TOGGLE_SHOW_COMPLETED',
      }
      const res = showCompletedReducer(deepFreeze(false), deepFreeze(action))
      expect(res).toEqual(true)
    })
  })
  describe('todosReducer', () => {
    it('should add a new todo', () => {
      const action = {
        type: 'TODO_ADD',
        text: 'Walk Pepper'
      }
      const res = todosReducer(deepFreeze([]), deepFreeze(action))
      expect(res.length).toEqual(1)
      expect(res[0].text).toEqual(action.text)
    })
    it('should toggle todo', () => {
      const todos = [{
        uuid: '123', text: 'Something', completed: true, createdAt: 123, completedAt: 125
      }]
      const action = {
        type: 'TODO_TOGGLE',
        uuid: '123'
      }
      const res = todosReducer(deepFreeze(todos), deepFreeze(action))
      expect(res[0].completed).toEqual(false)
      expect(res[0].completedAt).toEqual(undefined)
    })
  })
})
