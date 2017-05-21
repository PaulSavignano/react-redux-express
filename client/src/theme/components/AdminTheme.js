import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminTheme extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.theme || false
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'https://placehold.it/280x60'
    this.setState({ expanded: hasImage, image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: nextProps.theme.image })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, theme } = this.props
    console.log('inside AdminTheme')
    return (
      <section>
        <form
          onSubmit={handleSubmit((values) => {
            const update = {
              type: 'UPDATE_ITEM',
              values
            }
            dispatch(fetchUpdate(theme._id, update))
          })}
        >
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
            style={{ height: '100%' }}
          >
            <CardHeader
              title="Edit Theme Styles"
            />

            <CardText>
              <Field name="appBarFontFamily" label="appBarFontFamily" type="text" fullWidth={true} component={renderTextField} />
              <Field name="appBarColor" label="appBarColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="appBarTextColor" label="appBarTextColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="fontFamily" label="fontFamily" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary1Color" label="primary1Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary2Color" label="primary2Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary3Color" label="primary3Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent1Color" label="accent1Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent2Color" label="accent2Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent3Color" label="accent3Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="textColor" label="textColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="alternateTextColor" label="alternateTextColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="canvasColor" label="canvasColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="borderColor" label="borderColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="disabledColor" label="disabledColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="pickerHeaderColor" label="pickerHeaderColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="clockCircleColor" label="clockCircleColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="shadowColor" label="shadowColor" type="text" fullWidth={true} component={renderTextField} />
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </CardText>
            <CardActions style={{ display: 'flex' }}>
              <RaisedButton
                type="submit"
                label={this.state.submitted ? "Updated" : "Update"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                style={{ flex: '1 1 auto', margin: 8 }}
              />
            </CardActions>
          </Card>
        </form>
      </section>
    )
  }
}

AdminTheme = reduxForm({
  form: 'adminTheme'
})(AdminTheme)

AdminTheme = connect()(AdminTheme)

export default AdminTheme
