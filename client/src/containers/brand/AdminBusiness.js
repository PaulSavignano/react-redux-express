import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import normalizeZip from '../../utils/normalizeZip'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'name',
  'description',
  'phone',
  'email',
  'street',
  'city',
  'state',
  'zip',
  'facebook',
  'github',
  'google',
  'instagram',
  'linkedin',
  'twitter',
  'yelp',
  'youtube'
]

class AdminBusiness extends Component {
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
      canvasColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      isFetching,
      primary1Color,
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
        className="card"
        style={{ fontFamily, backgroundColor: canvasColor }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const path = `business/${_id}`
            return dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Business" />
          <div className="field-container">
            {fields.map(field => (
              <Field
                key={field}
                name={field}
                label={field}
                component={renderTextField}
                normalize={field === 'phone' ? normalizePhone : field === 'zip' ? normalizeZip : null}
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
              style={{ fontFamily, backgroundColor: primary1Color, color: canvasColor, margin: 4 }}
              label="update business"
              successLabel="business updated!"
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

const mapStateToProps = ({
  brand: {
    _id,
    business,
    isFetching,
    theme: { fontFamily, palette: { canvasColor, primary1Color }}
  }
}) => ({
  _id,
  canvasColor,
  initialValues: business,
  isFetching,
  fontFamily,
  primary1Color
})

AdminBusiness = connect(mapStateToProps)(AdminBusiness)

export default AdminBusiness
