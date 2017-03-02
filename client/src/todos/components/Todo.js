import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startUpdateTodo, startDeleteTodo } from '../actions/index'

export class Todo extends Component {
  render() {
    let textInput, submit
    const { _id, text, completed, dispatch } = this.props
    const styles = {
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
      },
      btnContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end'
      }
    }
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          submit.blur()
          const updates = {
            text: textInput.value
          }
          dispatch(startUpdateTodo(_id, updates))
        }}
        style={styles.form}
        className="mdl-card mdl-shadow--4dp"
      >
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="completed">
          <input
            type="checkbox"
            id="completed"
            className="mdl-checkbox__input"
            defaultChecked={completed}
            onClick={() => dispatch(startUpdateTodo(_id, { completed: !completed }))} />
        </label>
        <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
          <input
            className="mdl-textfield__input"
            type="text"
            ref={node => textInput = node}
            defaultValue={text}
          />
        </div>
        <div style={styles.btnContainer}>
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            type="submit"
            ref={node => submit = node}
          >
            Update
          </button>
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => dispatch(startDeleteTodo(_id))}
          >
            Delete
          </button>
        </div>
      </form>
    )
  }
}


export default connect()(Todo)
