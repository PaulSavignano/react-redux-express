import expect from 'expect'
import deepFreeze from 'deep-freeze-strict'
import { todoSearchReducer, showCompletedReducer } from './todoReducers'

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
})
