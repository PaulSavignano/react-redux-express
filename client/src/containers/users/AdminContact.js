import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Field } from 'redux-form'

import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/sections'

class AdminContact extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, componentId, sectionId } = this.props
    return (
      <Card className="cards">
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
            }}
          />
        </div>
      </Card>
    )
  }
}


export default connect()(AdminContact)
