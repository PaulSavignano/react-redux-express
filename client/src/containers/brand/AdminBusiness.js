import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import { fetchUpdate } from '../../actions/brand'

class AdminBusiness extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const { _id, dispatch, error, handleSubmit, submitSucceeded, submitting } = this.props
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
            const path = `business/${_id}`
            return dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Business" />
          <div className="field-container">
            <Field name="name" label="Brand Name" type="text" component={renderTextField} className="field" />
            <Field name="description" label="Brand Description" type="text" component={renderTextField} className="field" />
            <Field name="phone" label="Phone" type="text" component={renderTextField} normalize={normalizePhone} className="field" />
            <Field name="email" label="Email" type="text" component={renderTextField} className="field" />
            <Field name="street" label="Street" type="text" component={renderTextField} className="field" />
            <Field name="city" label="City" type="text" component={renderTextField} className="field" />
            <Field name="state" label="State" type="text" component={renderTextField} className="field" />
            <Field name="zip" label="Zip" type="text" component={renderTextField} className="field" />
            <Field name="facebook" label="facebook" type="text" component={renderTextField} className="field" />
            <Field name="github" label="github" type="text" component={renderTextField} className="field" />
            <Field name="google" label="google" type="text" component={renderTextField} className="field" />
            <Field name="instagram" label="instagram" type="text" component={renderTextField} className="field" />
            <Field name="linkedin" label="linkedin" type="text" component={renderTextField} className="field" />
            <Field name="twitter" label="twitter" type="text" component={renderTextField} className="field" />
            <Field name="yelp" label="yelp" type="text" component={renderTextField} className="field" />
            <Field name="youtube" label="youtube" type="text" component={renderTextField} className="field" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="BUSINESS"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminBusiness = reduxForm({
  form: 'business'
})(AdminBusiness)

const mapStateToProps = ({ brand: { _id, business } }) => ({
  _id,
  initialValues: business
})

AdminBusiness = connect(mapStateToProps)(AdminBusiness)

export default AdminBusiness
