import React from 'react'

import ProfileForm from '../../containers/users/ProfileForm'
import AddressesForm from './AddressesForm'
import OrderList from '../../containers/orders/OrderList'

const ProfilePage = () => (
  <section>
    <br/>
    <ProfileForm />
    <br/>
    <AddressesForm />
    <br/>
    <OrderList />
    <br/>
  </section>
)

export default ProfilePage
