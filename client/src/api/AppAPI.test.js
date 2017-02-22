import expect from 'expect'
import { filterTodos } from './AppAPI'

describe('filterTodos', () => {
  const todos = [
    { uuid: 1, text: 'Some text here', completed: true },
    { uuid: 2, text: 'Other text here', completed: false  },
    { uuid: 3, text: 'Some text here', completed: true  },
  ]
  it('should return all items if showCompleted is true', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos.length).toBe(3)
  })
  it('should return all items if showCompleted is false', () => {
    const filteredTodos = filterTodos(todos, false, '')
    expect(filteredTodos.length).toBe(1)
  })
  it('should sort by completed status', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos[0].completed).toBe(false)
  })
  it('should filter todos by searchText', () => {
    const filteredTodos = filterTodos(todos, true, 'some')
    expect(filteredTodos.length).toBe(2)
  })
  it('should return all todos if searchText is empty', () => {
    const filteredTodos = filterTodos(todos, true, '')
    expect(filteredTodos.length).toBe(3)
  })
})
