import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'fontFamily',
  'borderRadius',
  'primary1Color',
  'primary2Color',
  'primary3Color',
  'accent1Color',
  'accent2Color',
  'accent3Color',
  'textColor',
  'secondaryTextColor',
  'alternateTextColor',
  'canvasColor',
  'borderColor',
  'disabledColor',
  'pickerHeaderColor',
  'clockCircleColor',
  'shadowColor',
]

class AdminTheme extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const {
      _id,
      backgroundColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      isFetching,
      submitSucceeded,
      submitting
    } = this.props
    return (
      !isFetching &&
      <Card
        expanded={this.state.expanded}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
        style={{ backgroundColor, fontFamily }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const path = `theme/${_id}`
            return dispatch(fetchUpdate(path, { values }))
          })}
        >
          <CardTitle title="Theme" />
          <div className="field-container">
            {fields.map(field => (
              <Field
                key={field}
                name={field}
                label={field}
                component={renderTextField}
                className="field"
                style={{ fontFamily }}
              />
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="THEME"
              style={{ fontFamily }}
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

const mapStateToProps = ({
  brand: {
    _id,
    isFetching,
    theme,
  }
}) => ({
  _id,
  isFetching,
  backgroundColor: theme.palette.canvasColor,
  fontFamily: theme.fontFamily,
  initialValues: {
    ...theme,
    ...theme.palette
  }
})

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
