import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Field } from 'redux-form'

import AdminContactFormEdit from './AdminContactFormEdit'
import renderTextField from '../../components/fields/renderTextField'

class AdminContactForm extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleClose = () => this.setState({ editing: false })
  render() {
    const { editing } = this.state
    return (
      <Card className="card" onTouchTap={() => this.setState({ editing: true })}>
        <CardTitle title="Contact" subtitle="Enter your information" />
        <CardText>
          <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
          <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
          <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
        </CardText>
        <div className="button-container">
          <RaisedButton
            label="Contact"
            type="button"
            primary={true}
            className="button"
          />
        </div>
        {editing && <AdminContactFormEdit onClose={this.handleClose} editing={editing} />}
      </Card>
    )
  }
}


export default connect()(AdminContactForm)
