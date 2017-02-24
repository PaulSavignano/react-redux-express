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
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        paddingLeft: 16,
        alignItems: 'center'
      },
      item: {
        flex: '1 1 auto',
        width: 200
      },
      card: {
        height: 'auto',
        minHeight: 'auto'
      }
    }
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp" style={styles.card}>
        <form onSubmit={this.handleSubmit} style={styles.container}>
          <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
            <input className="mdl-textfield__input" type="text" ref="text" id="text" />
            <label className="mdl-textfield__label" htmlFor="text">Todo...</label>
          </div>
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default TodoAdd
