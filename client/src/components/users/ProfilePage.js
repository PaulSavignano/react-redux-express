import React from 'react'
import Paper from 'material-ui/Paper'

import ProfileForm from '../../containers/users/ProfileForm'
import AddressAdd from '../../containers/users/AddressAdd'
import AddressList from '../../containers/users/AddressList'
import OrderList from '../../containers/orders/OrderList'

const ProfilePage = () => (
  <Paper className="section">
    <h1>Profile</h1>
    <ProfileForm />
    <br/>
    <h1>Addresses</h1>
    <AddressList />
    <AddressAdd />
    <br/>
    <h1>Orders</h1>
    <OrderList />
  </Paper>
)

export default ProfilePage
