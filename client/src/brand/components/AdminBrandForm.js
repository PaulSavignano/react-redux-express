import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import normalizePhone from '../../modules/normalizePhone'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminBrandForm extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, brand } = this.props
    return (
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
            style={{ height: '100%' }}
          >
            <form
              onSubmit={handleSubmit((values) => {
                const update = { type: 'UPDATE_VALUES', values }
                dispatch(fetchUpdate(brand._id, update))
              })}
            >
              <CardTitle title="Brand" />
              <CardText>
                <Field name="name" label="Brand Name" type="text" fullWidth={true} component={renderTextField} />
                <Field name="description" label="Brand Description" type="text" fullWidth={true} component={renderTextField} />
                <Field name="phone" label="Phone" type="text" fullWidth={true} component={renderTextField} normalize={normalizePhone} />
                <Field name="email" label="Email" type="text" fullWidth={true} component={renderTextField} />
                <Field name="street" label="Street" type="text" fullWidth={true} component={renderTextField} />
                <Field name="city" label="City" type="text" fullWidth={true} component={renderTextField} />
                <Field name="state" label="State" type="text" fullWidth={true} component={renderTextField} />
                <Field name="zip" label="Zip" type="text" fullWidth={true} component={renderTextField} />
              </CardText>
              <CardTitle title="Social Media" />
              <CardText>
                <Field name="facebook" label="facebook" type="text" fullWidth={true} component={renderTextField} />
                <Field name="github" label="github" type="text" fullWidth={true} component={renderTextField} />
                <Field name="google" label="google" type="text" fullWidth={true} component={renderTextField} />
                <Field name="instagram" label="instagram" type="text" fullWidth={true} component={renderTextField} />
                <Field name="linkedin" label="linkedin" type="text" fullWidth={true} component={renderTextField} />
                <Field name="twitter" label="twitter" type="text" fullWidth={true} component={renderTextField} />
                <Field name="yelp" label="yelp" type="text" fullWidth={true} component={renderTextField} />
                <Field name="youtube" label="youtube" type="text" fullWidth={true} component={renderTextField} />
              </CardText>
              <CardTitle title="Theme" />
              <CardText>
                <Field name="mainColor" label="mainBackgroundColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="fontFamily" label="fontFamily" type="text" fullWidth={true} component={renderTextField} />
                <Field name="fontFamily2" label="fontFamily2" type="text" fullWidth={true} component={renderTextField} />
                <Field name="appBarColor" label="appBarColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="appBarTextColor" label="appBarTextColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="footerTextColor" label="footerTextColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="footerColor" label="footerColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="primary1Color" label="primary1Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="primary2Color" label="primary2Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="primary3Color" label="primary3Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="accent1Color" label="accent1Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="accent2Color" label="accent2Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="accent3Color" label="accent3Color" type="text" fullWidth={true} component={renderTextField} />
                <Field name="textColor" label="textColor" type="text" fullWidth={true} component={renderTextField} />
                <Field name="secondaryTextColor" label="secondaryTextColor" type="text" fullWidth={true} component={renderTextField} />
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
            </form>
          </Card>

    )
  }
}

AdminBrandForm = reduxForm({
  form: 'adminBrand'
})(AdminBrandForm)

AdminBrandForm = connect()(AdminBrandForm)

export default AdminBrandForm
