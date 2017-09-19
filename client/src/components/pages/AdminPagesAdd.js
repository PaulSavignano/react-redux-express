import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../fields/renderTextField'
import { fetchAdd } from '../../actions/pages'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

class AdminPagesAdd extends Component {
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      reset
    } = this.props
    return (
      <Card className="card">
        <form
          onSubmit={handleSubmit(values => {
            reset()
            return dispatch(fetchAdd(values))
          })}
          style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', padding: '4px 8px 16px 8px' }}
        >
          <Field
            name="name"
            label="Add Page Name"
            type="text"
            component={renderTextField}
            style={{ flex: '1 1 auto', margin: 8 }}
          />
          {error && <div className="error">{error}</div>}
          <div>
            <RaisedButton type="submit" label="Add" primary={true} style={{ margin: 4 }} />
          </div>
        </form>
      </Card>
    )
  }
}

AdminPagesAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'AdminPageAdd',
  validate
})(AdminPagesAdd)
