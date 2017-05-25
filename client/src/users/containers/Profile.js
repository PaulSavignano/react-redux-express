import React from 'react'
import { connect } from 'react-redux'

import ProfileForm from '../components/ProfileForm'
import AddressAdd from '../components/AddressAdd'
import AddressList from '../components/AddressList'
import Orders from '../../orders/containers/Orders'

const Profile = ({ user, initialValues, items }) => (
  <main>
    <ProfileForm user={user} initialValues={initialValues}/>
    <section><h1>Addresses</h1></section>
    <AddressAdd user={user} />
    <AddressList items={items} />
    <Orders user={user} />
  </main>
)

const mapStateToProps = ({ user }) => ({
  isFetching: user.isFetching,
  user: user,
  initialValues: user,
  items: user.addresses
})

export default connect(mapStateToProps)(Profile)
