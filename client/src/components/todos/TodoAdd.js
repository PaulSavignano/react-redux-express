import React, { Component } from 'react'

class TodoAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const todoText = this.refs.todoText.value
    if (todoText.length) {
      this.refs.todoText = ''
      this.props.onTodoAdd(todoText)
    } else {
      this.refs.todoText.focus()
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button>Add Todo</button>
        </form>
      </div>
    )
  }
}

export default TodoAdd
