import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'

import ProfileForm from '../components/ProfileForm'
import AddressAdd from '../components/AddressAdd'
import AddressList from '../components/AddressList'
import OrderList from '../../orders/components/OrderList'

const Profile = ({ user, initialValues, addresses, orders }) => (
  <section>
    <h1>Profile</h1>
    <ProfileForm user={user} initialValues={initialValues} />
    <br/>
    <h1>Addresses</h1>
    <AddressList items={addresses} />
    <AddressAdd user={user} />
    <br/>
    <h1>Orders</h1>
    <OrderList items={orders} />
  </section>
)

const mapStateToProps = ({ user, orders }) => ({
  isFetching: user.isFetching,
  user: user,
  initialValues: user.values,
  addresses: user.addresses,
  orders: orders.items
})

export default connect(mapStateToProps)(Profile)
