import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/sections'

class AdminContactFormEdit extends Component {
  render() {
    const { dispatch, editing, componentId, sectionId, handleEdit } = this.props
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
                dispatch(fetchUpdate(sectionId, { type: 'DELETE_CONTACT_FORM', componentId }))
                handleEdit()
              }}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={handleEdit}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={handleEdit}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <CardTitle title="Contact" subtitle="Enter your information" />
        <CardText>
          <TextField hintText="First Name" floatingLabelText="First Name" fullWidth={true} />
          <TextField hintText="Email" floatingLabelText="Email" fullWidth={true} />
          <TextField hintText="Message" floatingLabelText="Message" fullWidth={true} multiLine={true} rows={2} />
        </CardText>
        <div className="button-container">
          <RaisedButton
            type="button"
            label="Contact"
            fullWidth={true}
            primary={true}
          />
        </div>
      </Dialog>
    )
  }
}

export default connect()(AdminContactFormEdit)
