import React from 'react'
import { connect } from 'react-redux'

import ProfileForm from '../components/ProfileForm'
import AddressAdd from '../components/AddressAdd'
import AddressList from '../components/AddressList'
import OrderList from '../../orders/components/OrderList'

const Profile = ({ user, initialValues, addresses, orders, brand }) => {
  const fontFamily = brand.values.fontFamily || null
  const color = brand.values.palette ? brand.values.palette.textColor : null
  return (
    <section>
      <h1 style={{ fontFamily, color }}>Profile</h1>
      <ProfileForm user={user} initialValues={initialValues} />
      <br/>
      <h1 style={{ fontFamily, color }}>Addresses</h1>
      <AddressList items={addresses} />
      <AddressAdd user={user} />
      <br/>
      <h1 style={{ fontFamily, color }}>Orders</h1>
      <OrderList orders={orders} fontFamily={brand.values.fontFamily} color={brand.values.palette.textColor}/>
    </section>
  )
}

const mapStateToProps = ({ user, orders, brand }) => ({
  isFetching: user.isFetching,
  user,
  initialValues: user.values,
  addresses: user.addresses,
  orders: orders.items,
  brand
})

export default connect(mapStateToProps)(Profile)
