import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Field } from 'redux-form'
import Dialog from 'material-ui/Dialog'

import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/sections'

class AdminContactFormEdit extends Component {
  render() {
    const { dispatch, editing, componentId, sectionId, handleStopEdit } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              type="button"
              label="Remove Contact Form"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => {
                dispatch(fetchUpdate({ type: 'DELETE_CONTACT_FORM', componentId }))
                handleStopEdit()
              }}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => handleStopEdit()}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={() => handleStopEdit()}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <CardTitle title="Contact" subtitle="Enter your information" />
        <CardText>
          <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
          <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
          <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
        </CardText>
        <div className="button-container">
          <RaisedButton
            type="button"
            label="Remove Contact Form"
            className="delete-button"
            labelColor="#ffffff"
            style={{ flex: '1 1 auto', margin: 4 }}
            onTouchTap={() => {
              const update = {
                type: 'DELETE_CONTACT_FORM',
                componentId
              }
              dispatch(fetchUpdate(sectionId, update))
              handleStopEdit()
            }}
          />
        </div>
      </Dialog>
    )
  }
}

export default connect()(AdminContactFormEdit)
