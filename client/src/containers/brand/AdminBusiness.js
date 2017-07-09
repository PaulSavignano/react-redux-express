import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import normalizeZip from '../../utils/normalizeZip'
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
            <Field name="name" label="Brand Name" component={renderTextField} className="field" />
            <Field name="description" label="Brand Description" component={renderTextField} className="field" />
            <Field name="phone" label="Phone" component={renderTextField} normalize={normalizePhone} className="field" />
            <Field name="email" label="Email" component={renderTextField} className="field" />
            <Field name="street" label="Street" component={renderTextField} className="field" />
            <Field name="city" label="City" component={renderTextField} className="field" />
            <Field name="state" label="State" component={renderTextField} className="field" />
            <Field name="zip" label="Zip" component={renderTextField} normalize={normalizeZip} className="field" />
            <Field name="facebook" label="facebook" component={renderTextField} className="field" />
            <Field name="github" label="github" component={renderTextField} className="field" />
            <Field name="google" label="google" component={renderTextField} className="field" />
            <Field name="instagram" label="instagram" component={renderTextField} className="field" />
            <Field name="linkedin" label="linkedin" component={renderTextField} className="field" />
            <Field name="twitter" label="twitter" component={renderTextField} className="field" />
            <Field name="yelp" label="yelp" component={renderTextField} className="field" />
            <Field name="youtube" label="youtube" component={renderTextField} className="field" />
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
