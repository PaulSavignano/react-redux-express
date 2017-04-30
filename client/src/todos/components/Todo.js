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
        minHeight: 'auto',
        alignItems: 'center'
      },
      textField: {
        flex: '1 1 auto',
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
          className="mdl-grid mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp"
        >
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={_id}>
            <input
              type="checkbox"
              id={_id}
              className="mdl-checkbox__input"
              checked={completed}
              onTouchTap={() => dispatch(startUpdateTodo(_id, { completed: !completed }))} />
          </label>


          <div className="mdl-textfield mdl-js-textfield" style={styles.textField}>
            <input
              className="mdl-textfield__input"
              type="text"
              ref={node => textInput = node}
              defaultValue={text}
            />
          </div>
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
            onTouchTap={() => dispatch(startDeleteTodo(_id))}
          >
            Delete
          </button>
        </form>
    )
  }
}


export default connect()(Todo)
