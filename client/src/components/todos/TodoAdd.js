import React, { Component } from 'react'

class TodoAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const text = this.refs.text.value
    if (text.length) {
      const todo = { text }
      e.target.reset()
      this.props.onTodoAdd(todo)
    } else {
      this.refs.text.focus()
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="text" placeholder="What do you need to do?"/>
          <button>Add Todo</button>
        </form>
      </div>
    )
  }
}

export default TodoAdd
