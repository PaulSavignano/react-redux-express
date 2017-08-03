import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/iframes'

class AdminIframeEdit extends Component {
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded && !item.editing) {
      dispatch(stopEdit(item._id))
    }
  }
  render() {
    const { dispatch, error, handleSubmit, item, submitting } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values })))}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE IFRAME'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEdit(item._id))}
            />
          </div>
        }
        modal={false}
        open={item.editing}
        onRequestClose={() => dispatch(stopEdit(item._id))}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <Card>
          <CardHeader title={`Iframe ${item._id}`}/>
          <form className="field-container">
            <Field
              name="backgroundColor"
              label="backgroundColor"
              className="field"
              component={renderTextField}
            />
            <Field
              name="flex"
              label="flex"
              className="field"
              component={renderTextField}
            />
            <Field
              name="iframe"
              label="iframe"
              className="field"
              component={renderTextField}
            />
            <Field
              name="margin"
              label="margin"
              className="field"
              component={renderTextField}
            />
            <Field
              name="width"
              label="width"
              className="field"
              component={renderTextField}
            />
            <Field
              name="zDepth"
              label="zDepth"
              className="field"
              component={renderTextField}
            />
          </form>
          {error && <div className="error">{error}</div>}
        </Card>
      </Dialog>
    )
  }
}

AdminIframeEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `iframe_${item._id}`,
      item,
      initialValues: {
        ...values,
        zDepth: values.zDepth && values.zDepth.toString()
       }
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminIframeEdit)

export default AdminIframeEdit
