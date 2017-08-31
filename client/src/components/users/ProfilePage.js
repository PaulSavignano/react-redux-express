import React from 'react'
import { connect } from 'react-redux'

import userContainer from '../../containers/users/userContainer'
import ProfileForm from './ProfileForm'
import AddressesForm from './AddressesForm'
import OrderList from '../../containers/orders/OrderList'

const ProfilePage = ({ user }) => {
  return (
    <div className="page">
      <section className="section-margin">
        <br/>
        <ProfileForm user={user}/>
        <br/>
        <AddressesForm addresses={user.addresses} />
        <br/>
        <OrderList />
        <br/>
      </section>
    </div>
  )
}


export default userContainer(ProfilePage)
