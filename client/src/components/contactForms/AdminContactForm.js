import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import contactFormContainer from '../../containers/contactForms/contactFormContainer'
import { startEdit } from '../../actions/editItem'

class AdminContactForm extends Component {
  state = {
    elevation: 1,
    editing: false
  }
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'CONTACT_FORM',
    }))
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleEdit = () => this.setState({ editing: !this.state.editing })
  render() {
    const { editing, elevation } = this.state
    const { componentId, sectionId } = this.props
    return (
      <Card
        zDepth={elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleStartEdit}
        style={{ flex: '1 1 auto', margin: 16 }}
      >
        <CardTitle title="Contact" subtitle="Enter your information" />
        <CardText>
          <TextField hintText="First Name" floatingLabelText="First Name" fullWidth={true} />
          <TextField hintText="Email" floatingLabelText="Email" fullWidth={true} />
          <TextField hintText="Message" floatingLabelText="Message" fullWidth={true} multiLine={true} rows={2} />
        </CardText>
        <div className="button-container">
          <RaisedButton
            label="Contact"
            type="button"
            primary={true}
            className="button"
          />
        </div>
      </Card>
    )
  }
}


export default contactFormContainer(AdminContactForm)
