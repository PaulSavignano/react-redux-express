import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postTodo } from '../actions/index'

export class TodoAdd extends Component {
  render() {
    let textInput
    const { dispatch } = this.props
    const styles = {
      container: {
        width: '100%',
      },
      form: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        padding: 8,
        margin: 8,
        minHeight: 'auto',
        alignItems: 'center'
      },
      item: {
        flex: '1 1 auto',
      }
    }
    return (
      <div style={styles.container}>
        <form
          onSubmit={e => {
            e.preventDefault()
            const todo = {
              text: textInput.value
            }
            e.target.reset()
            dispatch(postTodo(todo))
          }}
          className="mdl-card mdl-shadow--4dp"
          style={styles.form}
        >
          <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
            <input
              className="mdl-textfield__input"
              type="text"
              ref={node => textInput = node}
              id="text"
            />
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

export default connect()(TodoAdd)
