import React, { Component } from 'react'

class Todo extends Component {
  render() {
    return (
      <li>
        {this.props.text}
      </li>
    )
  }
}

export default Todo
