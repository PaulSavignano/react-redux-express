import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import AdminContactFormEdit from './AdminContactFormEdit'

class AdminContactForm extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleEdit = () => this.setState({ editing: !this.state.editing })
  render() {
    const { editing, zDepth } = this.state
    const { componentId, sectionId } = this.props
    return (
      <Card
        zDepth={zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => this.setState({ editing: true })}
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
        {editing && <AdminContactFormEdit handleEdit={this.handleEdit} editing={editing} sectionId={sectionId} componentId={componentId} />}
      </Card>
    )
  }
}


export default connect()(AdminContactForm)
