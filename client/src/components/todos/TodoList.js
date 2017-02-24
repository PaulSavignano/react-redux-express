import React, { Component } from 'react'
import Todo from './Todo'

class TodoList extends Component {
  render() {
    const style = {
      width: 900
    }
    return (
      <div className="myClass" style={style}>
        {this.props.todos.map(todo => (
          <Todo
            key={todo.uuid}
            {...todo}
            onToggle={this.props.onToggle}
            onTodoDelete={this.props.onTodoDelete}
            onTodoUpdate={this.props.onTodoUpdate}
          />
        ))}
      </div>
    )
  }
}

export default TodoList
