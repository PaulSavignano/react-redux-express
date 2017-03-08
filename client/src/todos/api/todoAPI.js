export const filterTodos = (todos, showCompleted, searchTodos) => {
  var filteredTodos = todos
  filteredTodos = filteredTodos.filter(todo => {
    return !todo.completed || showCompleted
  })
  filteredTodos = filteredTodos.filter(todo => {
    const text = todo.text.toLowerCase()
    return searchTodos.length === 0 || text.indexOf(searchTodos.toLowerCase()) > -1
  })
  filteredTodos.sort((a, b) => {
    if (a.completed && b.completed) {
      return -1
    } else if (a.completed && !b.completed) {
      return 1
    } else {
      return 0
    }
  })
  return filteredTodos
}
