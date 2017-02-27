import React, { Component } from 'react'
import { connect } from 'react-redux'
import { todoToggle } from '../actions/index'

export class Todo extends Component {
  handleUpdate = (_id, uuid) => {
    const text = this.refs.text.value
    const todoUpdate = { _id, uuid, text }
    this.props.onTodoUpdate(todoUpdate)
  }
  render() {
    const { _id, uuid, text, completed, dispatch } = this.props
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',

        paddingLeft: 16
      },
      btnContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end'
      }
    }
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp">
        <form className="mdl-cell mdl-cell--8-col" onSubmit={this.handleSubmit}>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="todoToggle">
              <input type="checkbox" id="todoToggle" className="mdl-checkbox__input" defaultChecked={completed} onClick={() => dispatch(todoToggle(uuid))} />
            </label>
            <div className="mdl-textfield mdl-js-textfield" style={styles.text}>
              <input className="mdl-textfield__input" type="text" ref="text" id="name" defaultValue={text}/>
            </div>
          <div style={styles.btnContainer}>
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.handleUpdate(_id, uuid)}
            >
              Update
            </button>
            <button
              id="deleteCart"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.props.onTodoDelete(_id, uuid)}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    )
  }
}


export default connect()(Todo)
