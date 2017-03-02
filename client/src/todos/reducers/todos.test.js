import expect from 'expect'
import deepFreeze from 'deep-freeze-strict'
import { searchTodos, showCompleted, todos } from './todos'
import todoSeeds from '../seed'

describe('Todo Reducers', () => {

  describe('todo reducers', () => {

    // Create
    it('should add a new todo', () => {
      const action = {
        type: 'ADD_TODO',
        todo: todoSeeds[0]
      }
      const res = todos(deepFreeze([]), deepFreeze(action))
      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(action.todo)
    })

    // Read
    it('should fetch todos', () => {
      const action = {
        type: 'FETCH_TODOS',
        todos: todoSeeds
      };
      var res = todos(deepFreeze([]), deepFreeze(action));
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual(todoSeeds[0]);
    })

    // Update
    it('should update a todo', () => {
      const updates = {
        completed: false,
        completedAt: null
      }
      const action = {
        type: 'UPDATE_TODO',
        _id: todoSeeds[0]._id,
        updates
      }
      const res = todos(deepFreeze(todoSeeds), deepFreeze(action))
      expect(res[0].completed).toEqual(updates.completed)
      expect(res[0].completedAt).toEqual(updates.completedAt)
      expect(res[0].text).toEqual(todoSeeds[0].text)
    })

    // Delete
    it('should delete a todo', () => {
      const action = {
        type: 'DELETE_TODO',
        _id: todoSeeds[1]._id
      };
      var res = todos(deepFreeze(todoSeeds), deepFreeze(action));
      expect(res.length).toEqual(1);
      expect(res[1]).toNotExist();
    })
  })


  describe('searchTodos', () => {
    it('should set searchText', () => {
      const action = {
        type: 'SEARCH_TODOS',
        searchTodosText: 'dog'
      }
      const res = searchTodos(deepFreeze(''), deepFreeze(action))
      expect(res).toEqual(action.searchTodosText)
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
})
