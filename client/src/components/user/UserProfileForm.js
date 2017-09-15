import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'material-ui/Card'

import User from './User'
import UserRemove from './UserRemove'

class UserProfileForm extends Component {
  render() {
    const {
      onDelete,
      onFormSubmit,
      user
    } = this.props
    console.log(user)
    return (
      <Card className="UserProfileForm">
        <User
          form={`user_${user._id}_profile`}
          user={user}
          initialValues={user.values}
          onFormSubmit={onFormSubmit}
        />
        <UserRemove
          form={`user_${user._id}_remove`}
          onDelete={onDelete}
        />
      </Card>
    )
  }
}

UserProfileForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserProfileForm
