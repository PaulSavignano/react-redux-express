import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/texts'

const fields = [
  'flex',
  'margin',
  'padding',
  'width'
]

const AdminTextEdit = ({
  dispatch,
  error,
  handleSubmit,
  item: { _id, editing },
  submitSucceeded,
  submitting
}) => {
  return (
    <Dialog
      actions={
        <div className="button-container">
          <RaisedButton
            onTouchTap={handleSubmit((values) => dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values })))}
            label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE TEXT'}
            primary={true}
            style={{ flex: '1 1 auto', margin: 4 }}
          />
          <RaisedButton
            type="button"
            label="X"
            className="delete-button"
            labelColor="#ffffff"
            style={{ flex: '0 1 auto', margin: 4 }}
            onTouchTap={() => dispatch(fetchDelete(_id))}
          />
          <RaisedButton
            type="button"
            label="Cancel"
            className="delete-button"
            labelColor="#ffffff"
            style={{ flex: '0 1 auto', margin: 4 }}
            onTouchTap={() => dispatch(stopEdit(_id))}
          />
        </div>
      }
      modal={false}
      open={editing}
      onRequestClose={() => dispatch(stopEdit(_id))}
      autoScrollBodyContent={true}
      contentStyle={{ width: '100%', maxWidth: 1000 }}
      bodyStyle={{ padding: 8 }}
    >
      <Card>
        <CardHeader title={`Text ${_id}`}/>
        <form>
          <div>
            <Field
              name="text"
              label="text"
              component={renderWysiwgyField}
            />
          </div>
          <div className="field-container">
            {fields.map(field => (
              <Field
                key={field}
                name={field}
                label={field}
                className="field"
                component={renderTextField}
              />
            ))}
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </Card>
    </Dialog>
  )
}

export default compose(
  connect((state, { item: { _id, values }}) => ({
    form: `text_${_id}`,
    initialValues: values,
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminTextEdit)
