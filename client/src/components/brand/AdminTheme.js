import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../forms/SuccessableButton'
import renderTextField from '../forms/renderTextField'
import { fetchUpdate } from '../../actions/brand'

class AdminTheme extends Component {
  state = {
    zDepth: 1
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
            const path = `theme/${_id}`
            return dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Theme" />
          <div className="field-container">
            <Field name="fontFamily" label="fontFamily" type="text" component={renderTextField} className="field" />
            <Field name="fontFamily2" label="fontFamily2" type="text" component={renderTextField} className="field" />
            <Field name="fontFamily3" label="fontFamily3" type="text" component={renderTextField} className="field" />
            <Field name="primary1Color" label="primary1Color" type="text" component={renderTextField} className="field" />
            <Field name="primary2Color" label="primary2Color" type="text" component={renderTextField} className="field" />
            <Field name="primary3Color" label="primary3Color" type="text" component={renderTextField} className="field" />
            <Field name="accent1Color" label="accent1Color" type="text" component={renderTextField} className="field" />
            <Field name="accent2Color" label="accent2Color" type="text" component={renderTextField} className="field" />
            <Field name="accent3Color" label="accent3Color" type="text" component={renderTextField} className="field" />
            <Field name="textColor" label="textColor" type="text" component={renderTextField} className="field" />
            <Field name="secondaryTextColor" label="secondaryTextColor" type="text" component={renderTextField} className="field" />
            <Field name="alternateTextColor" label="alternateTextColor" type="text" component={renderTextField} className="field" />
            <Field name="canvasColor" label="canvasColor" type="text" component={renderTextField} className="field" />
            <Field name="borderColor" label="borderColor" type="text" component={renderTextField} className="field" />
            <Field name="disabledColor" label="disabledColor" type="text" component={renderTextField} className="field" />
            <Field name="pickerHeaderColor" label="pickerHeaderColor" type="text" component={renderTextField} className="field" />
            <Field name="clockCircleColor" label="clockCircleColor" type="text" component={renderTextField} className="field" />
            <Field name="shadowColor" label="shadowColor" type="text" component={renderTextField} className="field" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="THEME"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminTheme = reduxForm({
  form: 'theme'
})(AdminTheme)

const mapStateToProps = (state, { item }) => ({
  initialValues: {
    ...item,
    ...item.palette
  }
})

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
