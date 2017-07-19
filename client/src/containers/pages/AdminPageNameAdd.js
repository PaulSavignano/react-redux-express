import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../components/fields/renderTextField'
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

class AdminPageNameAdd extends Component {
  render() {
    const { error, handleSubmit, dispatch } = this.props
    return (
      <Card className="card">
        <form
          onSubmit={handleSubmit(values => {
            this.props.reset()
            dispatch(fetchAdd(values))
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

AdminPageNameAdd = reduxForm({
  form: 'AdminPageAdd',
  validate
})(AdminPageNameAdd)

export default AdminPageNameAdd
