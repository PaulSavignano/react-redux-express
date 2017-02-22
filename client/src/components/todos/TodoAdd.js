import React, { Component } from 'react'

const styles = {
  container: {
    margin: '0 auto'
  }
}

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
      <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={styles.container}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Add a todo</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <form onSubmit={this.handleSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" ref="text" id="text" />
              <label className="mdl-textfield__label" htmlFor="text">Text...</label>
            </div>
          </form>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Add Todo
          </a>
        </div>
      </div>
    )
  }
}

export default TodoAdd
