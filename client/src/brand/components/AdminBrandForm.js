import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate } from '../actions/index'
import normalizePhone from '../../modules/normalizePhone'

class AdminBrandForm extends Component {
  state = {
    zDepth: 1,
    submitted: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const { error, handleSubmit, dispatch, item } = this.props
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
            dispatch(fetchUpdate(item._id, update))
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
          <br/>
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
          <br/>
          <CardTitle title="Fonts" />
          <CardText>
            <Field name="fontFamily" label="fontFamily" type="text" fullWidth={true} component={renderTextField} />
            <Field name="fontFamily2" label="fontFamily2" type="text" fullWidth={true} component={renderTextField} />
            <Field name="fontFamily3" label="fontFamily3" type="text" fullWidth={true} component={renderTextField} />
          </CardText>
          <br/>
          <CardTitle title="App Bar" />
          <CardText>
            <Field name="appBarColor" label="color" type="text" fullWidth={true} component={renderTextField} />
            <Field name="appBarTextColor" label="textColor" type="text" fullWidth={true} component={renderTextField} />
          </CardText>
          <br/>
          <CardTitle title="Main" />
          <CardText>
            <Field name="mainColor" label="color" type="text" fullWidth={true} component={renderTextField} />
          </CardText>
          <br/>
          <CardTitle title="Footer" />
          <CardText>
            <Field name="footerColor" label="color" type="text" fullWidth={true} component={renderTextField} />
            <Field name="footerTextColor" label="textColor" type="text" fullWidth={true} component={renderTextField} />
            <Field name="footerBorderBottom" label="borderBottom" type="text" fullWidth={true} component={renderTextField} />
          </CardText>
          <br/>
          <CardTitle title="Palette" />
          <CardText>
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
  form: 'brand'
})(AdminBrandForm)

AdminBrandForm = connect()(AdminBrandForm)

export default AdminBrandForm
