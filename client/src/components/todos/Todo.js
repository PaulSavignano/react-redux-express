import React, { Component } from 'react'

class Todo extends Component {
  handleUpdate = (_id, uuid) => {
    const text = this.refs.text.value
    const todoUpdate = { _id, uuid, text }
    this.props.onTodoUpdate(todoUpdate)
  }
  render() {
    const { _id, uuid, text, completed } = this.props
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <input type="checkbox" defaultChecked={completed} onClick={() => this.props.onToggle(uuid)}/>
          <input type="text" defaultValue={text} ref="text"/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.handleUpdate(_id, uuid)}
          >
            Update
          </button>
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
