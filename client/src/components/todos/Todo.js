import React, { Component } from 'react'

class Todo extends Component {
  handleUpdate = (e, uuid) => {
    const updatedTodo = {

    }
    console.log(e.target.value)
    const todoUpdate = e.target.value
    this.props.onTodoUpdate(_id, uuid, todoUpdate)
  }
  render() {
    const { _id, uuid, text, completed } = this.props
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <input type="checkbox" defaultChecked={completed} onClick={() => this.props.onToggle(uuid)}/>
          <input type="text" defaultValue={text} onChange={(e) => this.handleUpdate(e, _id, uuid)}/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.props.onTodoDelete(_id, uuid)}
          >
            Delete
          </button>
        </span>
      </li>
    )
  }
}

export default Todo
