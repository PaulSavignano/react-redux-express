import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import contactFormContainer from '../../containers/contactForms/contactFormContainer'
import { startEdit } from '../../actions/editItem'

class AdminContactForm extends Component {
  state = {
    elevation: 1,
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
  render() {
    const { elevation } = this.state
    const { phone } = this.props
    return (
      <Card
        zDepth={elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleStartEdit}
        style={{ flex: '1 1 auto', margin: 16 }}
      >
        <CardTitle
          title={
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <div>Contact</div>
              { phone && <a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a>}
            </div>
          }
          subtitle="Enter your information"
        />
        <CardText>
          <TextField hintText="First Name" floatingLabelText="First Name" fullWidth={true} />
          <TextField hintText="Email" floatingLabelText="Email" fullWidth={true} />
          <TextField hintText="Message" floatingLabelText="Message" fullWidth={true} multiLine={true} rows={2} />
        </CardText>
        <div className="button-container">
          <RaisedButton
            disabled={true}
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

AdminContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}


export default contactFormContainer(AdminContactForm)
