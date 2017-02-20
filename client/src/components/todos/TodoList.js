import React, { Component } from 'react'
import Todo from './Todo'

class TodoList extends Component {
  render() {
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.todos.map(todo => (
          <Todo
            key={todo.uuid}
            {...todo}
            onToggle={this.props.onToggle}
            onTodoDelete={this.props.onTodoDelete}
            onTodoUpdate={this.props.onTodoUpdate}
          />
        ))}
      </ul>
    )
  }
}

export default TodoList
