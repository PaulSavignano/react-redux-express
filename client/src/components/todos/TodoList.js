import React, { Component } from 'react'
import Todo from './Todo'

class TodoList extends Component {
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {this.props.todos.map(todo =>
            <Todo key={todo.text} {...todo} />
          )}
        </ul>
      </div>

    )
  }
}

export default TodoList
