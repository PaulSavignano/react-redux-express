import React from 'react'

import ProfileForm from '../../containers/users/ProfileForm'
import AddressesForm from './AddressesForm'
import OrderList from '../../containers/orders/OrderList'

const ProfilePage = () => (
  <div className="page">
    <section className="section-margin">
      <br/>
      <ProfileForm />
      <br/>
      <AddressesForm />
      <br/>
      <OrderList />
      <br/>
    </section>
  </div>
)

export default ProfilePage
