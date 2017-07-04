import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../forms/SuccessableButton'
import renderTextField from '../forms/renderTextField'
import { fetchUpdate } from '../../actions/brand'

class AdminMain extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const { _id, dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <form
          onSubmit={handleSubmit((values) => {
            const path = `main/${_id}`
            dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Main" />
          <div className="field-container">
            <Field name="color" label="color" type="text" component={renderTextField} className="field" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="MAIN"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminMain = reduxForm({
  form: 'main'
})(AdminMain)

const mapStateToProps = (state, { item }) => ({
  initialValues: item
})

AdminMain = connect(mapStateToProps)(AdminMain)

export default AdminMain
