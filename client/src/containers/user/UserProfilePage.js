import React, { Component } from 'react'
import { connect } from 'react-redux'

import H3 from '../../components/typography/H3'
import UserProfileForm from '../../components/user/UserProfileForm'
import AddressesForm from '../../components/addresses/AddressesForm'
import OrderList from '../../components/orders/OrderList'
import * as addressesActions from '../../actions/addresses'
import * as userActions from '../../actions/user'

class UserProfilePage extends Component {
  state = {
    userInitialValues: null
  }
  handleUserValues= (values) => {
    const { dispatch } = this.props
    return dispatch(userActions.fetchUpdate({ values }))
  }
  handleUserDelete = () => {
    const { dispatch } = this.props
    return dispatch(userActions.fetchDelete())
  }
  handleAddressAdd = (values) => {
    const { dispatch } = this.props
    return dispatch(addressesActions.fetchAdminUpdate({ values }))
  }
  handleAddressUpdate = (itemId, values) => {
    const { dispatch } = this.props
    return dispatch(addressesActions.fetchUpdate(itemId, { values }))
  }
  handleAddressDelete = (itemId) => {
    const { dispatch } = this.props
    dispatch(addressesActions.fetchDelete(itemId))
  }
  componentWillMount() {
    const { user: { values }} = this.props
    this.setState({ userInitialValues: values })
  }
  componentWillReceiveProps({ user: { values }}) {
    if (values !== this.props.user.values) {
      this.setState({ userInitialValues: values })
    }
  }
  render() {
    const {
      dispatch,
      isFetching,
      user,
      orders
    } = this.props
    return (
      isFetching ? null :
      <div className="page">
        <section>
          <H3 margin="0 16px">Profile</H3>
          <UserProfileForm
            dispatch={dispatch}
            initialValues={this.state.userInitialValues}
            user={user}
            onFormSubmit={this.handleUserValues}
            onDelete={this.handleUserDelete}
          />
          <AddressesForm
            dispatch={dispatch}
            onAddressAdd={this.handleAddressAdd}
            onAddressUpdate={this.handleAddressUpdate}
            onAddressDelete={this.handleAddressDelete}
            user={user}
          />
          <OrderList
            dispatch={dispatch}
            orders={orders}
          />
        </section>
      </div>
    )
  }
}


export default connect(
  ({ user, orders }) => ({
    isFetching: user.isFetching || orders.isFetching ? true : false,
    orders: orders.items.filter(item => item.user === user._id),
    user
  })
)(UserProfilePage)
