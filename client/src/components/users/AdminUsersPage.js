import React from 'react'
import PropTypes from 'prop-types'

import usersContainer from '../../containers/users/usersContainer'
import AdminUsersItem from './AdminUsersItem'
import H2 from '../typography/H2'

const AdminUsersPage = ({
  dispatch,
  users
}) => (
  <div className="page">
    <section>
      <div className="users-page-heading">
        <H2>Users</H2>
      </div>
      {users.map(user => (
        <AdminUsersItem
          key={user._id}
          dispatch={dispatch}
          user={user}
          form={`userEdit_${user._id}`}
        />
      ))}
    </section>
  </div>
)

AdminUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default usersContainer(AdminUsersPage)
